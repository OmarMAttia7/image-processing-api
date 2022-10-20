import { Request, Response } from "express";
import getContentType from "../../../utilities/getContentType";
import imagesService from "../../services/images";
import parseDimensions from "../../services/images/parseDimensions";

async function getScaledImage(req: Request, res: Response): Promise<void> {
  const queryWidth = req.query.width;
  const queryHeight = req.query.height;
  const imageName = req.params.image;

  // Parse width and height
  const parsedDimensions = parseDimensions(queryWidth, queryHeight);

  // If they are not valid numbers respond with 400
  if (parsedDimensions === false) {
    res
      .status(400)
      .send(
        "Error 400: Incorrect syntax, width and height should be valid numbers"
      );

      return;
  }

  // Get width and height
  const { width, height } = parsedDimensions as {
    width: number;
    height: number;
  };

  // Get scaled image name
  const scaledImageName = `${imageName}@${width}x${height}`;

  try {
    // Get scaled image file
    const cachedImageFile = await imagesService.getImageFile(scaledImageName);

    // If cached image is not found create, cache and serve it
    if (cachedImageFile === false) {
      // Create scaled image
      const scaledImage = await imagesService.createScaledImage(
        imageName,
        width,
        height
      );

      // Cache scaled image
      await imagesService.saveImage(
        scaledImage.file,
        scaledImage.extension,
        "scaled",
        scaledImageName
      );

      // Get image Content-Type
      const contentType = getContentType(scaledImage.extension);

      // Respond with scaled image
      res.status(200).set("Content-Type", contentType).send(scaledImage.file);
    }

    // If cached image is found
    else {
      // Get image Content-Type
      const contentType = getContentType(cachedImageFile.extension);

      // Respond with scaled image
      res.status(200).set("Content-Type", contentType).send(cachedImageFile.file);
    }
    
  } catch (e) {
    res.status(500).send("Internal server error");
  }
}

export default getScaledImage;
