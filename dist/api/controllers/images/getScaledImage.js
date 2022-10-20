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
const images_1 = __importDefault(require("../../services/images"));
function getScaledImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const width = req.query.width;
        const height = req.query.height;
        const imageName = req.params.image;
        if (typeof width === "string" && typeof height === "string") {
            // Parse width and height
            const widthInt = parseInt(width);
            const hegihtInt = parseInt(height);
            // If they are valid numbers respond with the scaled image
            if (!Number.isNaN(widthInt) && !Number.isNaN(hegihtInt)) {
                // Get scaled image name
                const scaledImageName = `${imageName}@${widthInt}x${hegihtInt}`;
                // Get scaled image file
                const imageFile = yield images_1.default.getImageFile(scaledImageName);
                // If scaled image is not found create it
                if (imageFile === false) {
                    // Create scaled image
                    const scaledImage = yield images_1.default.createScaledImage(imageName, widthInt, hegihtInt);
                    // Cache scaled image
                    yield images_1.default.saveImage(scaledImage.file, scaledImage.extension, "scaled", scaledImageName);
                    res.status(200).set("Content-Type", "image/jpeg").send(scaledImage.file);
                }
                else {
                    res.status(200).set("Content-Type", "image/jpeg").send(imageFile.file);
                }
            }
            // If they are not valid numbers respond with error 400
            else {
                res
                    .status(400)
                    .send("Error 400: Incorrect syntax, width and height should be valid numbers");
            }
        }
        // If width and height are present but not strings for some reason
        else {
            res.status(500).send("Error 500: Internal server error.");
        }
    });
}
exports.default = getScaledImage;
