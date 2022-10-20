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
const promises_1 = __importDefault(require("fs/promises"));
const images_1 = __importDefault(require("../../configs/images"));
const searchForImage_1 = __importDefault(require("./searchForImage"));
function getImageFile(image) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if image exists
            const imageInfo = yield (0, searchForImage_1.default)(image);
            if (!imageInfo.exists || imageInfo.extension === undefined)
                return false;
            // Check if image is original or scaled
            let targetDir;
            if (imageInfo.type === "scaled") {
                targetDir = images_1.default.dir.thumbs;
            }
            else {
                targetDir = images_1.default.dir.full;
            }
            // Get image file
            const imageFile = yield promises_1.default.readFile(`${targetDir}/${image}.${imageInfo.extension}`);
            // Return image file and extension
            return { file: imageFile, extension: imageInfo.extension };
        }
        catch (e) {
            return false;
        }
    });
}
exports.default = getImageFile;
