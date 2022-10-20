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
const getContentType_1 = __importDefault(require("../../../utilities/getContentType"));
const images_1 = __importDefault(require("../../services/images"));
function getScaledImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryWidth = req.query.width;
        const queryHeight = req.query.height;
        const imageName = req.params.image;
        // Parse width and height
        const parsedDimensions = images_1.default.parseDimensions(queryWidth, queryHeight);
        // If they are not valid numbers respond with 400
        if (parsedDimensions === false) {
            res
                .status(400)
                .send("Error 400: Incorrect syntax, width and height should be valid numbers");
            return;
        }
        // Get width and height
        const { width, height } = parsedDimensions;
        // Get scaled image name
        const scaledImageName = `${imageName}@${width}x${height}`;
        try {
            // Get scaled image file
            const cachedImageFile = yield images_1.default.getImageFile(scaledImageName);
            // If cached image is not found create, cache and serve it
            if (cachedImageFile === false) {
                // Create scaled image
                const scaledImage = yield images_1.default.resizeImage(imageName, width, height);
                // Cache scaled image
                yield images_1.default.saveImage(scaledImage.file, scaledImage.extension, "scaled", scaledImageName);
                // Get image Content-Type
                const contentType = (0, getContentType_1.default)(scaledImage.extension);
                // Respond with scaled image
                res.status(200).set("Content-Type", contentType).send(scaledImage.file);
            }
            // If cached image is found
            else {
                // Get image Content-Type
                const contentType = (0, getContentType_1.default)(cachedImageFile.extension);
                // Respond with scaled image
                res.status(200).set("Content-Type", contentType).send(cachedImageFile.file);
            }
        }
        catch (e) {
            res.status(500).send("Internal server error");
        }
    });
}
exports.default = getScaledImage;
