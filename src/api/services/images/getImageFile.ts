import fs from "fs/promises";
import imagesConfig from "../../configs/images";
import searchForImage from "./searchForImage";

async function getImageFile(
  image: string
): Promise<{ file: Buffer; extension: string } | false> {
  try {
    // Check if image exists
    const imageInfo = await searchForImage(image);
    if (!imageInfo.exists || imageInfo.extension === undefined) return false;

    // Check if image is original or scaled
    let targetDir: string;
    if (imageInfo.type === "scaled") {
      targetDir = imagesConfig.dir.thumbs;
    } else {
      targetDir = imagesConfig.dir.full;
    }

    // Get image file
    const imageFile = await fs.readFile(
      `${targetDir}/${image}.${imageInfo.extension}`
    );

    // Return image file and extension
    return { file: imageFile, extension: imageInfo.extension };
  } catch (e) {
    return false;
  }
}

export default getImageFile;
