const router = require("express").Router();
const multer = require("multer")().single("image");
const resize = require("../../../utils/imageResize");
const upload = require("../../../utils/s3");
const { Character, CharacterAttribute, Attribute } = require("../../../model");
const HandledError = require("../../../error/Error");

router.post("/", async (req, res, next) => {
  try {
    const { user_id } = req.session;
    const character = await Character.create({ ...req.body, user_id });
    if (!Array.isArray(req.body.attributes))
      return next(HandledError.badRequest("Missing attributes array"));
    const attributes = req.body.attributes.map(attribute => ({
      ...attribute,
      character_id: character.id,
    }));
    CharacterAttribute.bulkCreate(attributes);
    res.json(character);
  } catch (error) {
    next(error);
  }
});

router.get("/attributes/:character_id", async (req, res, next) => {
  try {
    const { character_id } = req.params;
    console.log(character_id);
    const attributes = await CharacterAttribute.findAll({
      where: { character_id },
      attributes: ["attribute_id", "value"],
      // include: [{ model: Attribute, as: "attribute", attributes: ["name"] }],
    });
    res.json(attributes);
  } catch (error) {
    console.log(error);
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
    res.status(201).json({ location });
  } catch (error) {
    console.log(error);
    next(HandledError.unknownError());
  }
});

router.put("/attribute/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const attribute = await CharacterAttribute.findByPk(id, {
      include: [{ model: Character, attributes: ["user_id"] }],
    });
    if (!attribute) return next(HandledError.badRequest());
    if (attribute.character.user_id !== req.session.user_id)
      return next(HandledError.unauthorised());
    await attribute.update({ value: req.body.value });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await Character.findByPk(id);
    // Limit the character data that can be modified here to just name and description
    // Don't want changes to class_id and race_id leaking through
    const { character_name, description } = req.body;
    const params = {};
    if (character_name) params.character_name = character_name;
    if (description) params.description = description;
    await character.update(params);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
