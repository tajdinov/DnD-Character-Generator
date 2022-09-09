const generateStats = async event => {
  event.preventDefault();

  let hit_points = Math.floor(Math.random() * 10 + 1);
  document.getElementById("hit-points").value = hit_points;

  let strength = Math.floor(Math.random() * 10 + 1);
  document.getElementById("strength").value = strength;

  let constitution = Math.floor(Math.random() * 10 + 1);
  document.getElementById("constitution").value = constitution;

  let dexterity = Math.floor(Math.random() * 10 + 1);
  document.getElementById("dexterity").value = dexterity;

  let wisdom = Math.floor(Math.random() * 10 + 1);
  document.getElementById("wisdom").value = wisdom;

  let intelligence = Math.floor(Math.random() * 10 + 1);
  document.getElementById("intelligence").value = intelligence;

  let next = $("#create2");
  next.removeClass("hidden");
};

const create1 = async event => {
  event.preventDefault();

  let box1 = $(".character-first-box");
  let box2 = $(".character-second-box");
  box1.addClass("hidden");
  box2.removeClass("hidden");
};

const create2 = async event => {
  event.preventDefault();

  let box2 = $(".character-second-box");
  let box3 = $(".character-third-box");
  box2.addClass("hidden");
  box3.removeClass("hidden");
};

document
  .querySelector(".generateStats")
  .addEventListener("click", generateStats);

document.querySelector("#create1").addEventListener("click", create1);
document.querySelector("#create2").addEventListener("click", create2);
