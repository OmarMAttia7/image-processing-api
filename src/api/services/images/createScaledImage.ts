import getImageFile from "./getImageFile";
import sharp from 'sharp';

async function createScaledImage(image: string, width: number, height: number): Promise<{file: Buffer, extension: string}> {
  // Get original image
  const originalImage = (await getImageFile(image)) as {
    file: Buffer;
    extension: string;
  };

  // Scale original image
  const scaledImage = await sharp(originalImage.file)
    .resize(width, height)
    .toBuffer();
  
  // Return file and extension
  return {
    file: scaledImage,
    extension: originalImage.extension
  };
}

export default createScaledImage;