import { Request, Response } from "express";
import imagesService from "../../services/images";
import mime from "mime-types";

// Get original image
// This function assumes the existence of the image has already been verified
async function getOriginalImage(req: Request, res: Response): Promise<void> {
  try {
    // Get image file
    const imageFile = (await imagesService.getImageFile(req.params.image)) as {
      file: Buffer;
      extension: string;
    };

    // Look up image file extension
    const contentType = mime.lookup(imageFile.extension);

    // If image file extension is unknown throw error which will get caught and return error 500
    // This counts as a server error since the server should be reponsible for verifying extensions on upload
    if (contentType === false) throw Error("Unkown file extension");

    // Return image file with correct content type
    res.status(200).set("Content-Type", contentType).send(imageFile.file);
  } catch (e) {
    res.status(500).send("Error 500: Internal server error.");
  }
}

export default getOriginalImage;
