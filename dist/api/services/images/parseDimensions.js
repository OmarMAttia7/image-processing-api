"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseDimensions(widthInput, heightInput) {
    if (typeof widthInput === "string" && typeof heightInput === "string") {
        // Parse width and height
        const widthInt = Number(widthInput);
        const heightInt = Number(heightInput);
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
