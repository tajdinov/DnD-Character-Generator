const upperCaseWords = str => {
  return str
    .replace("_", " ")
    .split(" ")
    .map(str => str[0].toUpperCase() + str.slice(1))
    .join(" ");
};

module.exports = {
  upperCaseWords,
};
