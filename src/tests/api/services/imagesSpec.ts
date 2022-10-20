import fs from "fs/promises";
import imagesConfig from "../../../api/configs/images";
import { searchForImage, getImageFile } from "../../../api/services/images";
import parseDimensions from "../../../api/services/images/parseDimensions";

describe("Image methods", async () => {
  let imageName: string;
  let imageExtension: string;
  let imageFile: Buffer;
  // Set up an image for testing
  beforeAll(async () => {
    const fullImagesDir = await fs.readdir(imagesConfig.dir.full);

    imageName = fullImagesDir[0].substring(
      0,
      fullImagesDir[0].lastIndexOf(".")
    );

    imageExtension = fullImagesDir[0].substring(
      fullImagesDir[0].lastIndexOf(".") + 1
    );

    imageFile = await fs.readFile(`${imagesConfig.dir.full}/${imageName}.${imageExtension}`);
  });

  describe("searchForImage()", async () => {
    it("verifies if image exists", async () => {
      expect(await searchForImage(imageName)).toEqual({
        exists: true,
        extension: imageExtension,
        type: "original",
      });
    });

    it("verifies if image doesn't exist", async () => {
      expect(await searchForImage("animag/*%^$&/ethatdoesntexist")).toEqual({
        exists: false,
      });
    });
  });


  describe("getImageFile()", async () => {
    it("gets image file content and extension", async () => {
      expect(await getImageFile(imageName)).toEqual({
        file: imageFile,
        extension: imageExtension
      })
    });

    it("returns false if image doesn't exist", async () => {
      expect(await getImageFile("animag/*%^$&/ethatdoesntexist")).toBeFalse();
    });
  });

  describe("parseDimensions()", () => {
    it("parses width and height correctly", () => {
      expect(parseDimensions("100", "100")).toEqual({width: 100, height: 100});
    });

    it("returns false if inputs are not valid", () => {
      expect(parseDimensions("stringwidth", "100")).toBeFalse();
      expect(parseDimensions("100", "stringheight")).toBeFalse();
      expect(parseDimensions("stringwidth", "stringheight")).toBeFalse();
    })
  });
});
