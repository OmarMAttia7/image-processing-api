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
function saveImage(imageFile, imageExtension, type, imageName) {
    return __awaiter(this, void 0, void 0, function* () {
        let targetDir;
        if (type === "original") {
            targetDir = images_1.default.dir.full;
        }
        else {
            targetDir = images_1.default.dir.thumbs;
        }
        yield promises_1.default.writeFile(`${targetDir}/${imageName}.${imageExtension}`, imageFile);
    });
}
exports.default = saveImage;
