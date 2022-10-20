import imagesConfig from '../../configs/images';
import fs from 'fs/promises';

type imageType = "original" | "scaled";

// Check if image exists and return extension
async function searchForImage(
  image: string
): Promise<{ exists: boolean; extension?: string; type?: imageType }> {
  try {
    // Check if image is original or scaled
    let type: imageType;
    let targetDir: string;
    if (image.includes("@")) {
      targetDir = imagesConfig.dir.thumbs;
      type = "scaled";
    } else {
      targetDir = imagesConfig.dir.full;
      type = "original";
    }

    // Read images directory
    const imagesArr = await fs.readdir(targetDir);

    // Check if image exists
    const filteredImageArr = imagesArr.filter((imageFileName) => {
      const extensionIndex = imageFileName.lastIndexOf(".");
      const imageName = imageFileName.substring(0, extensionIndex);
      // Find requested image
      if (imageName === image) {
        return true;
      }
      return false;
    });

    // If image exists return exists: true, and extension
    if (filteredImageArr[0] !== undefined) {
      const requestedImage = filteredImageArr[0];

      return {
        exists: true,
        extension: requestedImage.substring(
          requestedImage.lastIndexOf(".") + 1
        ),
        type,
      };
    }

    // If image doesn't exist return exists: false
    return {
      exists: false,
    };
  } catch (e) {
    return {
      exists: false,
    };
  }
}

export default searchForImage;