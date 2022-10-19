import express from "express";
import imagesRoute from "./routes/images";

const app = express();

app.use("/api", imagesRoute);

export default app;
