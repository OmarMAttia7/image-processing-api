"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = __importDefault(require("../../configs/images"));
const promises_1 = __importDefault(require("fs/promises"));
// Check if image exists and return extension
function searchForImage(image) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if image is original or scaled
            let type;
            let targetDir;
            if (image.includes("@")) {
                targetDir = images_1.default.dir.thumbs;
                type = "scaled";
            }
            else {
                targetDir = images_1.default.dir.full;
                type = "original";
            }
            // Read images directory
            const imagesArr = yield promises_1.default.readdir(targetDir);
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
                    extension: requestedImage.substring(requestedImage.lastIndexOf(".") + 1),
                    type,
                };
            }
            // If image doesn't exist return exists: false
            return {
                exists: false,
            };
        }
        catch (e) {
            return {
                exists: false,
            };
        }
    });
}
exports.default = searchForImage;
