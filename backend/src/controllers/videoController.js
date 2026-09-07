import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoDirectory = path.join(__dirname, "../../videos");

export const streamVideo = (req, res) => {
    const filename = path.basename(req.params.filename);
    const videoPath = path.join(videoDirectory, filename);

    // 1. Kiểm tra xem file video có tồn tại không
    if (!fs.existsSync(videoPath)) {
        return res.status(404).json({
            message: "Video not found",
        });

    }

    // 2. Lấy tổng kích thước (dung lượng) của tệp video (tính bằng byte)
    const fileSize = fs.statSync(videoPath).size;
    // 3. Lấy Range từ request
    const range = req.headers.range;   

    // Trường hợp 1: Trình duyệt không yêu cầu Range (Tải toàn bộ file)
    if (!range) {
        res.writeHead(200, {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
            "Accept-Ranges": "bytes",
        });

        const videoStream = fs.createReadStream(videoPath);

        videoStream.on("error", (err) => {
            console.error(
                `Lỗi Stream [${filename}]:`,
                err.message
            );

            if (!res.headersSent) {
                res.status(500).send("Stream error");
            }
        });

        return videoStream.pipe(res);
    }


    // TRƯỜNG HỢP 2: Có Range
    const rangeMatch = range.match(/bytes=(\d*)-(\d*)/);

    if (!rangeMatch) {
        return res.status(416).set({
            "Content-Range": `bytes */${fileSize}`,
        }).send("Invalid range");
    }
    

    const start = rangeMatch[1] ? Number(rangeMatch[1]) : 0;
    const requestedEnd = rangeMatch[2] ? Number(rangeMatch[2]) : fileSize - 1;
    const end = Math.min(requestedEnd, fileSize - 1);
    
    // Kiểm tra tính hợp lệ của số (Tránh trường hợp NaN hoặc sai lệch khoảng)
    if (isNaN(start) || isNaN(end) || start >= fileSize || start > end) {
        return res.status(416).set({
            "Content-Range": `bytes */${fileSize}`,
        }).send("Range not satisfiable");
    }

    const chunkSize = end - start + 1;

    res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
    });

    // Tạo stream và thêm bộ lắng nghe lỗi để không bị sập server
    const videoStream = fs.createReadStream(videoPath, {start, end});

    videoStream.on('error', (err) => {
        console.error(`Lỗi Stream [${filename}]:`, err.message);
        // Nếu lỗi xảy ra trước khi kịp gửi Header thì trả về lỗi 500
        if (!res.headersSent) {
            res.status(500).send("Stream error");
        }
    })

    videoStream.pipe(res);

}