import fs from "fs/promises";
import imagesConfig from "../../configs/images";
import { imageType } from "./types";

async function saveImage(
  imageFile: Buffer,
  imageExtension: string,
  type: imageType,
  imageName: string
): Promise<void> {
  let targetDir: string;
  if (type === "original") {
    targetDir = imagesConfig.dir.full;
  } else {
    targetDir = imagesConfig.dir.thumbs;
  }

  await fs.writeFile(
    `${targetDir}/${imageName}.${imageExtension}`,
    imageFile
  );

}

export default saveImage;
