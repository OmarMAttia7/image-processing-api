import { Request, Response } from "express";
import imagesService from "../../services/images";
import mime from "mime-types";

async function getFullImage(req: Request, res: Response): Promise<void> {
  try {
    // Get image file
    const imageFile = await imagesService.getImageFile(req.params.image);

    // If image is not found
    if (imageFile === false) {
      res.status(404).send("Image not found");
    }
    // If image is found
    else {
      // Look up image file extension
      const contentType = mime.lookup(imageFile.extension);

      // If image file extension is unkown throw error which will return error 500
      // This counts as a server error since the server should be reponsible for verifying extensions
      if (contentType === false) throw Error("Unkown file extension");

      //
      res.status(200).set("Content-Type", contentType).send(imageFile.file);
    }
  } catch (e) {
    res.status(500).send("Error 500: Internal server error.");
  }
}

export default getFullImage;
