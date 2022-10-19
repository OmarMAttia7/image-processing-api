import { Router } from "express";
import { getImage } from "../../utilities/images";
const router = Router();

router.get("/images", (req, res) => {
  res.send(
    "request /api/images/:image to get the full image \n" +
      "or for example /api/images/:image?width=100&height=100 to get a scaled image"
  );
});

router.get('/images/:image', (req, res) => {
  const imageName = req.params.image;

  getImage(imageName).then(file => {
    if(file !== undefined) {
      res.status(200)
      .set('Content-Type', 'image/jpeg')
      .send(file);
    }else{
      res.status(404).send('Image not found.');
    }
  }).catch(e => console.log(e));
});

export default router;
