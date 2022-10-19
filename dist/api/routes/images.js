"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const images_1 = require("../../utilities/images");
const router = (0, express_1.Router)();
router.get("/images", (req, res) => {
    res.send("request /api/images/:image to get the full image \n" +
        "or for example /api/images/:image?width=100&height=100 to get a scaled image");
});
router.get('/images/:image', (req, res) => {
    const imageName = req.params.image;
    (0, images_1.getImage)(imageName).then(file => {
        if (file !== undefined) {
            res.status(200)
                .set('Content-Type', 'image/jpeg')
                .send(file);
        }
        else {
            res.status(404).send('Image not found.');
        }
    }).catch(e => console.log(e));
});
exports.default = router;
