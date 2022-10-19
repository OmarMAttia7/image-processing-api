import { Request, Response } from "express";
import imagesService from "../../services/images";
async function getImage(req: Request, res: Response): Promise<void> {
  try {
    const imageFile = await imagesService.getImageFile(req.params.image);
    res.status(200).set("Content-Type", "image/jpeg").send(imageFile);
  } catch (e) {
    res.status(404).send("Image not found");
  }
}

export default { getImage };
