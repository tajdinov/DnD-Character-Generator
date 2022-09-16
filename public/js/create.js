const rootDiv = document.getElementById("create-character");
const raceButtons = document.getElementById("races");
const classButtons = document.getElementById("classes");
const pageCollection = document.querySelectorAll(".page");
const diceElements = document.getElementById("page-attributes");
const createBtn = document.getElementById("create-btn");

const namePage = "page-name";
const racePage = "page-race";
const classPage = "page-class";
const attributesPage = "page-attributes";

let selectedRace;
let selectedClass;
const attributeValues = {};

rootDiv.addEventListener("click", e => {
  const page = e.target.dataset.page;
  if (page) {
    navPage(page);
  }
});

rootDiv.addEventListener("input", e => {
  const dice = e.target.closest(".dice").dataset.id;
  attributeValues[dice].attribute = e.target.value;
  renderAttributes();
  filterAttributeSelects();
});

raceButtons.addEventListener("click", e => {
  const value = e.target.dataset;
  selectedRace = value;
  renderInfoScreen(value, "race-info");
});

classButtons.addEventListener("click", e => {
  const value = e.target.dataset;
  selectedClass = value;
  renderInfoScreen(value, "class-info");
});

diceElements.addEventListener("click", e => {
  if (e.target.classList.contains("roll")) {
    e.target.hidden = true;
    rollDice(e.target.closest(".dice"));
  }
});

createBtn.addEventListener("click", createCharacter);

// when renderInfoScreen is called, it should unhide the info for the selected class or race //
const renderInfoScreen = (data, id) => {
  const displayFrame = document.getElementById(id);
  displayFrame.hidden = false;
  const displayInfo = displayFrame.querySelector(".info");

  displayInfo.innerText = data.description;
};

const renderAttributes = () => {
  Array.from(document.querySelectorAll(".assigned-dice")).forEach(display => {
    const item = Object.values(attributeValues).find(item => {
      return item.attribute === display.dataset.id;
    });
    if (!item) return;
    console.log(item);
    display.innerText = item.value;
  });
};

const filterAttributeSelects = () => {
  Array.from(document.querySelectorAll("available-attributes")).forEach(
    select => {
      // Array.from select.querySelectorAll("option")
    }
  );
};

const rollDice = element => {
  element.querySelector(".roll-container").hidden = false;
  const dice = element.querySelectorAll(".individual-roll");
  const rolls = Array.from(dice).map(dice => {
    const value = Math.floor(Math.random() * 6 + 1);
    dice.innerText = value;
    return { value, element: dice };
  });
  const min = rolls.reduce((p, c) => (c.value < p.value ? c : p));
  min.element.classList.add("lowest");
  const total = rolls
    .filter(item => item !== min)
    .reduce((p, c) => p + parseInt(c.value), 0);
  element.querySelector(".display").innerText = total;
  attributeValues[element.dataset.id] = {
    value: total,
    attribute: null,
    element,
  };
  console.log(attributeValues);
};

const navPage = selectedPage => {
  Array.from(pageCollection).forEach(page => {
    page.hidden = true;
  });
  document.getElementById(selectedPage).hidden = false;
};

function createCharacter() {
  fetch("/api/user/character", {
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// const generateStats = async event => {
//   event.preventDefault();

//   let hit_points = Math.floor(Math.random() * 10 + 1);
//   document.getElementById("hit-points").value = hit_points;

//   let strength = Math.floor(Math.random() * 10 + 1);
//   document.getElementById("strength").value = strength;

//   let constitution = Math.floor(Math.random() * 10 + 1);
//   document.getElementById("constitution").value = constitution;

//   let dexterity = Math.floor(Math.random() * 10 + 1);
//   document.getElementById("dexterity").value = dexterity;

//   let wisdom = Math.floor(Math.random() * 10 + 1);
//   document.getElementById("wisdom").value = wisdom;

//   let intelligence = Math.floor(Math.random() * 10 + 1);
//   document.getElementById("intelligence").value = intelligence;

//   let next = $("#create2");
//   next.removeClass("hidden");
//   let btn = $(".btn_generate");
//   btn.addClass("hidden");
// };

// const create1 = async event => {
//   event.preventDefault();

//   let box1 = $(".character-first-box");
//   let box2 = $(".character-second-box");
//   box1.addClass("hidden");
//   box2.removeClass("hidden");
// };

// const create2 = async event => {
//   event.preventDefault();

//   let box2 = $(".character-second-box");
//   let box3 = $(".character-third-box");

//   box2.addClass("hidden");
//   box3.removeClass("hidden");
// };

//select the classes we require
// const cube = document.querySelector(".cube");
// const currentClass = "";

//this function will generate a random number between 1 and 6 (or whatever value you send it)
// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
// }

//our main roll dice function on click
// let rollDice = async event => {
//   event.preventDefault();
//   //genberate a random number between 1 and 6 with out getRandomInt function
//   const randNum = getRandomInt(1, 7);
//   console.log(randNum);
//   //generate a class with the random number between 1 - 6 called showClass
//   const showClass = "show-" + randNum;
//   console.log(showClass);
//   // if there is a class already selected remove it
//   if (currentClass) {
//     cube.classList.remove(currentClass);
//   }
//   // add the new showclass with the generated number
//   cube.classList.add(showClass);
//   //set the current class to the randomly generated number
//   currentClass = showClass;
// };
// set initial side
//rollDice();
// document.querySelector(".generateStats").addEventListener("click", rollDice);
// document
//   .querySelector(".generateStats")
//   .addEventListener("click", generateStats);

// document.querySelector("#create1").addEventListener("click", create1);
// document.querySelector("#create2").addEventListener("click", create2);

// const createFormHandler = async event => {
//   event.preventDefault();

//   // Collect values from the forms
//   let character_name = document.querySelector("#character-name").value.trim();
//   let class_id = document.querySelector("#character-class").value.trim();
//   let race_id = document.querySelector("#character-race").value.trim();
//   let hit_points = document.querySelector("#hit-points").value.trim();
//   let strength = document.querySelector("#strength").value.trim();
//   let dexterity = document.querySelector("#constitution").value.trim();
//   let constitution = document.querySelector("#dexterity").value.trim();
//   let wisdom = document.querySelector("#wisdom").value.trim();
//   let intelligence = document.querySelector("#intelligence").value.trim();

//   if (
//     character_name &&
//     class_id &&
//     race_id &&
//     hit_points &&
//     strength &&
//     dexterity &&
//     constitution &&
//     wisdom &&
//     intelligence
//   ) {
//     const response = await fetch("/api/user/character", {
//       method: "POST",
//       body: JSON.stringify({
//         character_name,
//         class_id,
//         race_id,
//         hit_points,
//         strength,
//         dexterity,
//         constitution,
//         wisdom,
//         intelligence,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       const character = await response.json();
//       document.location.replace(`/update/${character.id}`);
//     } else {
//       alert("Failed to create a character");
//     }
//   }
// };

// form.addEventListener("submit", createFormHandler);
