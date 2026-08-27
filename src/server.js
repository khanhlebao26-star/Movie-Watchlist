const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    res.json({message: "Hello World"});
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

// GET, POST, PUT, DELETE
// http://localhost:/5001/hello
