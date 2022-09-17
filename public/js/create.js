import initDice from "/js/dice.js";

const rootDiv = document.getElementById("create-character");
const raceButtons = document.getElementById("races");
const classButtons = document.getElementById("classes");
const pageCollection = document.querySelectorAll(".page");
const dicePage = document.getElementById("page-attributes");
const createBtn = document.getElementById("create-btn");
// Total number of dice rolled
const DIE_COUNT = 4;
// Number of dice included in total (top scoring die only)
const DIE_USED = 3;

let selectedRace;
let selectedClass;
const attributeValues = {};

const diceAnimationContainer = document.getElementById(
  "dice-animation-container"
);

// Create dice containers and arrange them so that renderer can be sized correctly
const diceContainers = new Array(DIE_COUNT).fill(0).map(_ => {
  const div = document.createElement("div");
  div.classList.add("dice-container");
  diceAnimationContainer.appendChild(div);
  return div;
});

// Create an array that holds controls to each dice
// Create and populate div elements in the selected container at the same time
const diceAnimations = diceContainers.map(async div => {
  div.classList.add("dice");
  const returnValue = { ...(await initDice(div)) };
  div.addEventListener("click", () => {
    const value = Math.floor(Math.random() * 6) + 1;
    returnValue.rollDice(value);
  });
  return returnValue;
});

window.addEventListener("resize", () => {
  // Leave renderers alone unless small drops below
  diceAnimations.forEach(async dice => {
    (await dice).onResize();
  });
});

// Listen for clicks from any element that has a data-page attribute
// Used to navigate between screens on the /create route
rootDiv.addEventListener("click", e => {
  const page = e.target.dataset.page;
  if (page) {
    navPage(page);
  }
});

// Listen for change events (used with Select elements to detect a new option input)
rootDiv.addEventListener("input", e => {
  // Find the parent dice element and get its id
  const dice = e.target.closest(".roll").dataset.id;
  // Get the value - (id of attribute selected)
  let value = e.target.value;
  // If it's the default Select option then remove the attribute assigned to the attributeValues map
  if (value === "default") {
    delete attributeValues[dice].attribute;
    value = null;
  } else {
    attributeValues[dice].attribute = e.target.value;
  }
  // Render all attributes at the same time to keep app synced
  // Pass the attribute being changed so we can animate it
  renderAttributes(attributeValues[dice].attribute);
  // Run filter function on all Select elements so we don't show attributes that have already been assigned
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

// Event delegation to handle 'Roll Dice' buttons
dicePage.addEventListener("click", e => {
  if (e.target.classList.contains("roll-btn")) {
    e.target.hidden = true;
    rollDice(e.target.closest(".roll"));
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

const renderAttributes = attribute => {
  Array.from(document.querySelectorAll(".assigned-dice")).forEach(display => {
    const item = Object.values(attributeValues).find(item => {
      return item.attribute === display.dataset.id;
    });
    if (!item) {
      display.innerText = "";
      display.classList.remove("emphasize");
      return;
    }
    display.innerText = item.value;
    if (display.dataset.id === attribute) {
      display.classList.add("emphasize");
    }
  });
};

// Filter all Select elements so we don't show attributes that have already been assigned
const filterAttributeSelects = () => {
  // Performance - create a map based on attribute id for O(1) lookup
  const attributeMap = Object.values(attributeValues).reduce((p, c) => {
    if (c.attribute) {
      p[c.attribute] = c;
    }
    return p;
  }, {});
  // Remove attribute options from select elements on dices (die?) if they have been assigned.
  // However - still show the option on the dice it is selected on
  Array.from(document.querySelectorAll(".available-attributes")).forEach(
    select => {
      const diceId = select.dataset.id;
      Array.from(select.querySelectorAll("option")).forEach(option => {
        // Hide each option depending on whether the attribute (option) has been assigned
        // Except if the select menu belongs to the element that is selecting that attribute
        if (select.value === option.value) return;
        option.hidden = attributeMap[option.value];
      });
    }
  );
};

//
const displayDiceTotal = (element, value, delay) => {
  setTimeout(() => {
    const display = element.querySelector(".display");
    const rollContainer = element.querySelector(".roll-container");
    display.innerText = value;
    display.classList.add("emphasize");
    rollContainer.hidden = false;
  }, delay);
};

const rollDice = async element => {
  const dice = element.querySelectorAll(".individual-roll");
  const rolls = await Promise.all(
    diceAnimations.map(async (dicePromise, idx) => {
      const value = Math.floor(Math.random() * 6 + 1);
      const duration = 1800 + idx * 250;
      const dice = await dicePromise;
      dice.element.classList.remove("translucent");
      dice.rollDice(value, duration);
      return { value, duration, element: dice.element };
    })
  );
  rolls.sort((a, b) => b.value - a.value);
  const minDice = rolls.slice(DIE_USED);
  minDice.forEach(dice => {
    dice.element.classList.add("translucent");
  });
  // Get the total of the dice, excluding any that shouldn't be used
  const total = rolls
    .slice(0, DIE_USED)
    .reduce((p, c) => p + parseInt(c.value), 0);
  const delay = rolls.reduce((p, c) => Math.max(p, c.duration), 0);
  displayDiceTotal(element, total, delay);

  attributeValues[element.dataset.id] = {
    value: total,
    attribute: null,
    diceId: element.dataset.id,
  };
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
