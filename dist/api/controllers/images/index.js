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
const getOriginalImage_1 = __importDefault(require("./getOriginalImage"));
const getScaledImage_1 = __importDefault(require("./getScaledImage"));
function getImage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const width = req.query.width;
        const height = req.query.height;
        try {
            // If width or height parameters are not present
            // return full image
            if (width === undefined || height === undefined) {
                return yield (0, getOriginalImage_1.default)(req, res);
            }
            // If width and height parameters are present
            next("route");
        }
        catch (e) {
            res.status(500).send("Error 500: Internal server error.");
        }
    });
}
exports.default = { getImage, getScaledImage: getScaledImage_1.default };
