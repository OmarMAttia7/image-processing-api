import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("This is a test path.");
  console.log("Test path was run.");
});

app.listen(port, () => {
  console.log(`The server is running at port ${port}`);
});
