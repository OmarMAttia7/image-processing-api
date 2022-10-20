import { NextFunction, Request, Response } from "express";
import imagesService from '../services/images';

async function findImage(req: Request, res: Response, next: NextFunction): Promise<void> {

  try {
    const imageInfo = await imagesService.searchForImage(
      req.params.image
    );
    if (!imageInfo.exists) {
      res.status(404).send("Image not found");
    }else{
      next();
    }
  }catch(e){
    res.status(500).send("Error 500: Internal server error.");
  }

}

export default { findImage };