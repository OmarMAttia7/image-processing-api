import fs from "fs/promises";
import path from "path";

async function getImage(
  image: string,
  width?: number,
  height?: number
): Promise<Buffer | undefined> {
  try {
    return await fs.readFile(
      path.join(__dirname, "/../../assets/images/full", `${image}.jpg`)
    );
  } catch (e) {
    console.log(e);
  }
}

export { getImage };
