const edit_char = async event => {
  event.preventDefault();

  console.log("open character edit screen");
  document.location.replace("/update");
};

document.querySelector(".edit_char1").addEventListener("click", edit_char);
document.querySelector(".edit_char2").addEventListener("click", edit_char);
document.querySelector(".edit_char3").addEventListener("click", edit_char);
document.querySelector(".edit_char").addEventListener("click", edit_char);
