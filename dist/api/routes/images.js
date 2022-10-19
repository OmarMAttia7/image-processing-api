"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const images_1 = __importDefault(require("../controllers/images"));
const router = (0, express_1.Router)();
//  GET main /images Route
router.get("/images", (req, res) => {
    res.send("request /api/images/{image} to get the full image \n" +
        "or /api/images/:image?width={width}&height={height} to get a scaled image");
});
//  GET specific image
router.get("/images/:image", images_1.default.getImage);
exports.default = router;
