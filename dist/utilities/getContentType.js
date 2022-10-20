"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mime_types_1 = __importDefault(require("mime-types"));
function getContentType(extension) {
    const contentType = mime_types_1.default.lookup(extension);
    if (contentType === false)
        throw Error("Unsupported file extension");
    return contentType;
}
exports.default = getContentType;
