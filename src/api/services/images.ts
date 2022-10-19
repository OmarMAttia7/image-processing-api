import fs from "fs/promises";
import path from "path";

const imagesDir = path.resolve(__dirname, "../../../assets/images/full");

// Check if image exists and return extension
async function searchForImage(
  image: string
): Promise<{ exists: boolean; extension?: string }> {
  try {
    // Read images directory
    const imagesArr = await fs.readdir(imagesDir);

    // Check if image exists and save extension
    const filteredImageArr = imagesArr.filter((imageFileName) => {
      const extensionIndex = imageFileName.lastIndexOf(".");
      const imageName = imageFileName.substring(0, extensionIndex);
      // Find requested image
      if(imageName === image){
        return true;
      }
      return false;
    });

    // If image exists return exists: true, and extension
    if(filteredImageArr[0] !== undefined){
      const requestedImage = filteredImageArr[0];
      
      return {
        exists: true,
        extension: requestedImage.substring(
          requestedImage.lastIndexOf('.') + 1
        )
      }
    }
    
    // If image doesn't exist return exists: false
    return {
      exists: false
    }
  } catch (e) {
    return {
      exists: false
    }
  }
}

async function getImageFile(image: string): Promise<Buffer | false> {
  try {
    // Check if image exists
    const imageInfo = await searchForImage(image);
    if(!imageInfo.exists || imageInfo.extension === undefined) return false;
    
    const imageFile = await fs.readFile(`${imagesDir}/${image}.${imageInfo.extension}`);

    return imageFile;
  } catch (e) {
    return false;
  }
}

export default { getImageFile };
