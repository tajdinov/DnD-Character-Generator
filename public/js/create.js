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
    const response = await fetch("/api/character", {
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
