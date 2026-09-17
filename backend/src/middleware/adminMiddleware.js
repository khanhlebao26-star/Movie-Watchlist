export const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            status: "error",
            message: "Admin access required",
        });
    }

    next();
};