const attributeContainer = document.getElementById("attribute-container");
const imageForm = document.querySelector("#upload-image-form");
const nameIcon = document.getElementById("name-icon");
const nameBtn = document.getElementById("name-btn");
const nameInput = document.getElementById("name-input");
const nameUnderline = document.getElementById("name-underline");
const avatarUpload = document.getElementById("avatar-upload");
const avatarImage = document.getElementById("avatar-img");
const debouncer = {};
const DEBOUNCE_TIMER = 800;
const originalAttributes = [];
const charId = window.location.pathname.split("/").pop();
let originalName = nameInput.value;

nameBtn.addEventListener("click", () => {
  if (nameInput.hasAttribute("readonly")) {
    nameInput.removeAttribute("readonly");
    nameIcon.classList.remove("fa-pen");
    nameIcon.classList.add("fa-floppy-disk");
    nameUnderline.classList.add("ghost");
    nameInput.select(0, nameInput.length);
  } else {
    saveName();
  }
});

const setNameReadOnly = () => {
  nameInput.setAttribute("readonly", true);
  nameIcon.classList.remove("fa-floppy-disk");
  nameIcon.classList.add("fa-pen");
  nameUnderline.classList.remove("ghost");
  nameInput.blur();
};

avatarUpload.addEventListener("input", uploadFile);

attributeContainer.addEventListener("click", attributeHandler);

nameInput.addEventListener("keypress", e => {
  if (e.code === "Enter") saveName();
});

async function saveName() {
  setNameReadOnly();
  const character_name = nameInput.value.trim();
  if (character_name === originalName) return;
  const options = {
    method: "PUT",
    body: JSON.stringify({ character_name }),
    headers: { "Content-Type": "application/json" },
  };
  console.log(options);
  const response = await fetch(`/api/user/character/${charId}`, options);
  if (response.ok) {
    originalName = character_name;
  } else {
    alert("Failed to update the character's name");
  }
}

async function attributeHandler(e) {
  if (e.target.classList.contains("update")) {
    // Get the id of the 'through table' - CharacterAttribute.id
    const attribute = e.target.getAttribute("data-value");
    // If another request was sent in the debounce period then cancel it
    clearTimeout(debouncer[attribute]);
    // Get the increment value
    const addBy = e.target.classList.contains("up")
      ? 1
      : e.target.classList.contains("down")
      ? -1
      : 0;

    // Get a reference to the element displaying the attribute value
    const displayElement = e.target
      .closest(".attribute-frame")
      .querySelector(".value-p-text");
    // The updated value
    const value = parseInt(displayElement.innerText) + addBy;
    // Display new value
    displayElement.innerText = value;
    // Debounce the query - if no other changes are made in the debounce period then send a request to update the database
    const timer = setTimeout(() => {
      saveAttributes(attribute, value);
    }, DEBOUNCE_TIMER);
    debouncer[attribute] = timer;
  }
}

const saveAttributes = async (attribute, value) => {
  const response = await fetch(`/api/user/character/attribute/${attribute}`, {
    method: "PUT",
    body: JSON.stringify({
      value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
  } else {
  }
};

async function uploadFile(event) {
  let formData = new FormData();
  formData.append("image", event.target.files[0]);
  const response = await fetch(`/api/user/character/image/${charId}`, {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    const data = await response.json();
    // Because the url remains the same (awsbucket/user_id.character_id.png)
    // We need to refresh the browser cache so that it doesn't just grab the existing image from memory (which will be the old image)
    await fetch(data.location, { cache: "no-cache", mode: "no-cors" });
    avatarImage.src = data.location;
  } else {
    alert("Failed to upoad");
  }
}
