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
  let btn = $(".btn_generate");
  btn.addClass("hidden");
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

//select the classes we require
const cube = document.querySelector(".cube");
const currentClass = "";

//this function will generate a random number between 1 and 6 (or whatever value you send it)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//our main roll dice function on click
let rollDice = async event => {
  event.preventDefault();
  //genberate a random number between 1 and 6 with out getRandomInt function
  const randNum = getRandomInt(1, 7);
  console.log(randNum);
  //generate a class with the random number between 1 - 6 called showClass
  const showClass = "show-" + randNum;
  console.log(showClass);
  // if there is a class already selected remove it
  if (currentClass) {
    cube.classList.remove(currentClass);
  }
  // add the new showclass with the generated number
  cube.classList.add(showClass);
  //set the current class to the randomly generated number
  currentClass = showClass;
};
// set initial side
//rollDice();
document.querySelector(".generateStats").addEventListener("click", rollDice);
document
  .querySelector(".generateStats")
  .addEventListener("click", generateStats);

document.querySelector("#create1").addEventListener("click", create1);
document.querySelector("#create2").addEventListener("click", create2);

const createFormHandler = async event => {
  event.preventDefault();

  // Collect values from the forms
  let character_name = document.querySelector("#character-name").value.trim();
  let character_class = document.querySelector("#character-class").value.trim();
  let character_race = document.querySelector("#character-race").value.trim();
  let hit_poins = document.querySelector("#hit-points").value.trim();
  let strength = document.querySelector("#strength").value.trim();
  let dexterity = document.querySelector("#constitution").value.trim();
  let constitution = document.querySelector("#dexterity").value.trim();
  let wisdom = document.querySelector("#wisdom").value.trim();
  let intelligence = document.querySelector("#intelligence").value.trim();

  if (
    character_name &&
    character_class &&
    character_race &&
    hit_poins &&
    strength &&
    dexterity &&
    constitution &&
    wisdom &&
    intelligence
  ) {
    const response = await fetch("/api/characters", {
      method: "POST",
      body: JSON.stringify({
        character_name,
        character_class,
        character_race,
        hit_poins,
        strength,
        dexterity,
        constitution,
        wisdom,
        intelligence,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/homepage");
      console.log(response);
    } else {
      alert("Failed to create a character");
    }
  }
};

document
  .querySelector(".create-form")
  .addEventListener("submit", createFormHandler);
