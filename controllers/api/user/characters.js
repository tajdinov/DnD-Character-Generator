const router = require("express").Router();
const multer = require("multer")().single("image");
const resize = require("../../../utils/imageResize");
const upload = require("../../../utils/s3");
const { Character } = require("../../../model");
const HandledError = require("../../../error/Error");

router.post("/", async (req, res, next) => {
  try {
    const { user_id } = req.session;
    const character = await Character.create({ ...req.body, user_id });
    res.json(character);
  } catch (error) {
    next(error);
  }
});

router.post("/image/:char_id", multer, async (req, res, next) => {
  try {
    const { user_id } = req.session;
    const { char_id } = req.params;
    const key = `${user_id}.${char_id}.png`;
    const image = req.file;
    if (!image) {
      return next(HandledError.badRequest());
    }
    const character = await Character.findByPk(char_id);
    if (!character) return next(HandledError.badRequest());
    const resizedImage = await resize(image.buffer);
    const location = await upload(resizedImage, key);
    await character.update({ avatar: location });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    next(HandledError.unknownError());
  }
});

module.exports = router;
