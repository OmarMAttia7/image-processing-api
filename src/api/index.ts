import express from "express";

const app = express();

app.get("/api", (req, res) => {
  res.send("This is a test path.");
  console.log("Test path was run.");
});

export default app;