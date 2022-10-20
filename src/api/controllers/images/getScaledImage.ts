import { Request, Response } from "express";
import imagesService from "../../services/images";
import sharp from "sharp";

async function getScaledImage(req: Request, res: Response): Promise<void> {
  const width = req.query.width;
  const height = req.query.height;

  if (typeof width === "string" && typeof height === "string") {
    // Parse width and height
    const widthInt = parseInt(width);
    const hegihtInt = parseInt(height);

    // If they are not valid numbers respond with error 400
    if (Number.isNaN(widthInt) || Number.isNaN(hegihtInt)) {
      res
        .status(400)
        .send(
          "Error 400: Incorrect syntax, width and height should be valid numbers"
        );
    }

    // If they are valid numbers respond with the scaled image
    else {
      // Get image file
      const imageFile = await imagesService.getImageFile(
        `${req.params.image}@${widthInt}x${hegihtInt}`
      );

      // If image is not found create scaled image
      if (imageFile === false) {
        // Get original image
        const originalImage = await imagesService.getImageFile(
          req.params.image
        );
        
        // Scale original image
        if (originalImage !== false) {
          const scaledImage = await sharp(originalImage.file)
            .resize(widthInt, hegihtInt)
            .toBuffer();
          
          res.status(200).set('Content-Type', 'image/jpeg').send(scaledImage);
        }
      }
    }
  }
  // If width and height are present but not strings for some reason
  else {
    res.status(500).send("Error 500: Internal server error.");
  }
}

export default getScaledImage;
