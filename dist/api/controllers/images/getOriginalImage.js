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
const getContentType_1 = __importDefault(require("../../../utilities/getContentType"));
// Get original image
// This function assumes the existence of the image has already been verified
function getOriginalImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get image file
            const imageFile = (yield images_1.default.getImageFile(req.params.image));
            // Get image Content-Type
            const contentType = (0, getContentType_1.default)(imageFile.extension);
            // Return image file with correct content type
            res.status(200).set("Content-Type", contentType).send(imageFile.file);
        }
        catch (e) {
            res.status(500).send("Error 500: Internal server error.");
        }
    });
}
exports.default = getOriginalImage;
