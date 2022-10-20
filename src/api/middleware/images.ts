import { NextFunction, Request, Response } from "express";
import imagesService from "../services/images";

async function findImage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Get image information
    const imageInfo = await imagesService.searchForImage(req.params.image);

    // If image doesn't exist respond with 404
    if (!imageInfo.exists) {
      res.status(404).send("Image not found");
    } 
    // If image exists pass onto next middleware
    else next();
  } catch (e) {
    res.status(500).send("Error 500: Internal server error.");
  }
}

export default { findImage };
