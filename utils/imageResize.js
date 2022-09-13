const sharp = require("sharp");

const WIDTH = 300;

const resize = async (image, width = WIDTH) => {
  return await sharp(image).resize(width).png().toBuffer();
};

module.exports = resize;
