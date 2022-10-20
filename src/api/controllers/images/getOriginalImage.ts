import { Request, Response } from "express";
import imagesService from "../../services/images";
import getContentType from "../../../utilities/getContentType";

// Get original image
// This function assumes the existence of the image has already been verified
async function getOriginalImage(req: Request, res: Response): Promise<void> {
  try {
    // Get image file
    const imageFile = (await imagesService.getImageFile(req.params.image)) as {
      file: Buffer;
      extension: string;
    };

    // Get image Content-Type
    const contentType = getContentType(imageFile.extension);

    // Return image file with correct content type
    res.status(200).set("Content-Type", contentType).send(imageFile.file);
  } catch (e) {
    res.status(500).send("Error 500: Internal server error.");
  }
}

export default getOriginalImage;
