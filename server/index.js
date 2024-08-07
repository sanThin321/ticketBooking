import express from "express";
const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("Backend server");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

