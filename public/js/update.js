const updateFormHandler = async event => {
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
      alert("Chaaracter Updated");
      document.location.replace("/update/:id");
      console.log(response);
    } else {
      alert("Failed to update a character");
    }
  }
};

document
  .querySelector(".update-character-form")
  .addEventListener("submit", updateFormHandler);
