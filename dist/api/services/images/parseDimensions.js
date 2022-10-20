"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseDimensions(widthInput, heightInput) {
    if (typeof widthInput === "string" && typeof heightInput === "string") {
        // Parse width and height
        const widthInt = parseInt(widthInput);
        const heightInt = parseInt(heightInput);
        if (Number.isNaN(widthInt) || Number.isNaN(heightInt)) {
            return false;
        }
        return { width: widthInt, height: heightInt };
    }
    else {
        return false;
    }
}
exports.default = parseDimensions;
