import { NextFunction, Request, Response } from "express";
import getFullImage from "./getFullImage";
import getScaledImage from "./getScaledImage";

async function getImage(req: Request, res: Response, next: NextFunction): Promise<void> {
  const width = req.query.width;
  const height = req.query.height;
  try {
    // If width or height parameters are not present
    // return full image
    if (width === undefined || height === undefined) {
      return await getFullImage(req, res);
    }

    // If width and height are present
    next('route');
  } catch (e) {
    res.status(500).send("Error 500: Internal server error.");
  }
}

export default { getImage, getScaledImage };
