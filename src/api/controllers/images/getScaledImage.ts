import { Request, Response } from "express";
import imagesService from "../../services/images";

async function getScaledImage(req: Request, res: Response): Promise<void> {
  const width = req.query.width;
  const height = req.query.height;
  const imageName = req.params.image;
  if (typeof width === "string" && typeof height === "string") {
    // Parse width and height
    const widthInt = parseInt(width);
    const hegihtInt = parseInt(height);

    // If they are valid numbers respond with the scaled image
    if (!Number.isNaN(widthInt) && !Number.isNaN(hegihtInt)) {
      // Get scaled image name
      const scaledImageName = `${imageName}@${widthInt}x${hegihtInt}`

      // Get scaled image file
      const imageFile = await imagesService.getImageFile(
        scaledImageName
      );

      // If scaled image is not found create it
      if (imageFile === false) {
        // Create scaled image
        const scaledImage = await imagesService.createScaledImage(imageName, widthInt, hegihtInt);

        // Cache scaled image
        await imagesService.saveImage(scaledImage.file, scaledImage.extension, "scaled", scaledImageName)

        res.status(200).set("Content-Type", "image/jpeg").send(scaledImage.file);
      }else{
        res.status(200).set("Content-Type", "image/jpeg").send(imageFile.file)
      }
    }
    // If they are not valid numbers respond with error 400
    else {
      res
        .status(400)
        .send(
          "Error 400: Incorrect syntax, width and height should be valid numbers"
        );
    }
  }
  // If width and height are present but not strings for some reason
  else {
    res.status(500).send("Error 500: Internal server error.");
  }
}

export default getScaledImage;
