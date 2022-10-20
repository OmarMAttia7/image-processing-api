"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const searchForImage_1 = __importDefault(require("./searchForImage"));
const getImageFile_1 = __importDefault(require("./getImageFile"));
exports.default = { getImageFile: getImageFile_1.default, searchForImage: searchForImage_1.default };
