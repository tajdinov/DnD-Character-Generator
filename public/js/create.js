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
  let value = e.target.value;
  if (value === "default") {
    delete attributeValues[dice].attribute;
    value = null;
  } else {
    attributeValues[dice].attribute = e.target.value;
  }
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
    if (!item) {
      display.innerText = "";
      return;
    }
    // console.log(item);
    display.innerText = item.value;
  });
};

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
        if (!option.value) return;
        if (attributeMap[option.value]?.diceId === diceId) return;
        option.hidden = attributeMap[option.value];
      });
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
    diceId: element.dataset.id,
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
