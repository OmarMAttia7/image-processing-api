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
const sharp_1 = __importDefault(require("sharp"));
function getScaledImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const width = req.query.width;
        const height = req.query.height;
        if (typeof width === "string" && typeof height === "string") {
            // Parse width and height
            const widthInt = parseInt(width);
            const hegihtInt = parseInt(height);
            // If they are not valid numbers respond with error 400
            if (Number.isNaN(widthInt) || Number.isNaN(hegihtInt)) {
                res
                    .status(400)
                    .send("Error 400: Incorrect syntax, width and height should be valid numbers");
            }
            // If they are valid numbers respond with the scaled image
            else {
                // Get image file
                const imageFile = yield images_1.default.getImageFile(`${req.params.image}@${widthInt}x${hegihtInt}`);
                // If image is not found create scaled image
                if (imageFile === false) {
                    // Get original image
                    const originalImage = yield images_1.default.getImageFile(req.params.image);
                    // Scale original image
                    if (originalImage !== false) {
                        const scaledImage = yield (0, sharp_1.default)(originalImage.file)
                            .resize(widthInt, hegihtInt)
                            .toBuffer();
                        res.status(200).set('Content-Type', 'image/jpeg').send(scaledImage);
                    }
                }
            }
        }
        // If width and height are present but not strings for some reason
        else {
            res.status(500).send("Error 500: Internal server error.");
        }
    });
}
exports.default = getScaledImage;
