import { Router } from "express";
import imagesController from "../controllers/images";

const router = Router();

//  GET main /images Route
router.get("/images", (req, res) => {
  res.send(
    "request /api/images/{image} to get the full image \n" +
      "or /api/images/:image?width={width}&height={height} to get a scaled image"
  );
});

//  GET specific image
router.get("/images/:image", imagesController.getImage);

export default router;
