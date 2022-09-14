const updateContainer = document.getElementById("attribute-container");

updateContainer.addEventListener("click", async e => {
  if (e.target.classList.contains("update")) {
    const attribute = e.target.getAttribute("data-type");

    const charId = location.pathname.split("/").pop();
    const adder = e.target.classList.contains("up")
      ? 1
      : e.target.classList.contains("down")
      ? -1
      : 0;

    const value = e.target
      .closest(".attribute-frame")
      .querySelector(".value-p-text");

    value.innerText = parseInt(value.innerText) + adder;

    //     const response = await fetch(`/api/user/character/update/${charId}`, {
    //       method: "PUT",
    //       body: JSON.stringify({
    //         [attribute]: value,
    //         adder,
    //       }),
    //       headers: { "Content-Type": "application/json" },
    //     });

    //     if (response.ok) {
    //       document.location.reload();
    //     } else {
    //       alert(response.statusText);
    //     }
    //   }
  }
});
