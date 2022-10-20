"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dir = {
    full: path_1.default.resolve(__dirname, "../../../assets/images/full"),
    thumbs: path_1.default.resolve(__dirname, "../../../assets/images/thumbs"),
};
exports.default = { dir };
