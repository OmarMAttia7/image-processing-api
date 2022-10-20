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
const images_1 = __importDefault(require("../services/images"));
function findImage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get image information
            const imageInfo = yield images_1.default.searchForImage(req.params.image);
            // If image doesn't exist respond with 404
            if (!imageInfo.exists) {
                res.status(404).send("Image not found");
            }
            // If image exists pass onto next middleware
            else
                next();
        }
        catch (e) {
            res.status(500).send("Error 500: Internal server error.");
        }
    });
}
exports.default = { findImage };
