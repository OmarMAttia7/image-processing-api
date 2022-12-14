import { Request, Response, Router } from "express";
import imagesController from "../controllers/images";
import imagesMiddleware from "../middleware/findImage";

const router = Router();

//  GET main /images Route
router.get("/images", (req: Request, res: Response): void => {
  res.send(
    "request /api/images/{image} to get the full image \n" +
      "or /api/images/:image?width={width}&height={height} to get a scaled image"
  );
});

//  GET original image
router.get(
  "/images/:image",
  imagesMiddleware.findImage,
  imagesController.getImage
);

// GET resized image
router.get(
  "/images/:image",
  imagesMiddleware.findImage,
  imagesController.getScaledImage
);

export default router;
