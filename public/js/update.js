// Element containing all the attribute frames
const attributeContainer = document.getElementById("attribute-container");
// Image form
const imageForm = document.querySelector("#upload-image-form");
const nameIcon = document.getElementById("name-icon");
const nameBtn = document.getElementById("name-btn");
const nameInput = document.getElementById("name-input");
const nameUnderline = document.getElementById("name-underline");
const debouncer = {};
const DEBOUNCE_TIMER = 800;

nameBtn.addEventListener("click", () => {
  if (nameInput.hasAttribute("readonly")) {
    nameInput.removeAttribute("readonly");
    nameIcon.classList.remove("fa-pen");
    nameIcon.classList.add("fa-floppy-disk");
    nameUnderline.classList.add("ghost");
    nameInput.select(0, nameInput.length);
  } else {
    nameInput.setAttribute("readonly", true);
    nameIcon.classList.remove("fa-floppy-disk");
    nameIcon.classList.add("fa-pen");
    nameUnderline.classList.remove("ghost");
  }
});

imageForm.addEventListener("submit", uploadFile);

attributeContainer.addEventListener("click", async e => {
  if (e.target.classList.contains("update")) {
    // Get the id of the 'through table' - CharacterAttribute.id
    const attribute = e.target.getAttribute("data-value");
    // If another request was sent in the debounce period then cancel it
    clearTimeout(debouncer[attribute]);

    // Get
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
});

const saveAttributes = async (attribute, value) => {
  const response = await fetch(`/api/user/character/attribute/${attribute}`, {
    method: "PUT",
    body: JSON.stringify({
      value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("save successful");
  } else {
  }
};

async function uploadFile(event) {
  event.preventDefault();
  let char_id = window.location.pathname.split("/").pop();
  let formData = new FormData();
  formData.append("image", fileupload.files[0]);
  const response = await fetch(`/api/user/character/image/${char_id}`, {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    document.location.replace(`/update/${char_id}`);
  } else {
    alert("Failed to upoad");
  }
}
