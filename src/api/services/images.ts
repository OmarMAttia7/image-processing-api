import fs from "fs/promises";
import path from "path";

const imagesDir = {
  full: path.resolve(__dirname, "../../../assets/images/full"),
  thumbs: path.resolve(__dirname, "../../../assets/images/thumbs"),
};

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
      targetDir = imagesDir.thumbs;
      type = "scaled";
    } else {
      targetDir = imagesDir.full;
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

//
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
      targetDir = imagesDir.thumbs;
    } else {
      targetDir = imagesDir.full;
    }

    // Get image file
    const imageFile = await fs.readFile(
      `${targetDir}/${image}.${imageInfo.extension}`
    );

    return { file: imageFile, extension: imageInfo.extension };
  } catch (e) {
    return false;
  }
}

export default { getImageFile };
