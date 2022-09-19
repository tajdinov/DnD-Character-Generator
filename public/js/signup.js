const form = document.getElementById("signup-form");

const signupFormHandler = async event => {
  event.preventDefault();
  const first_name = document.querySelector("#first-name-signup").value.trim();
  const last_name = document.querySelector("#last-name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (first_name && last_name && email && password) {
    const response = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ first_name, last_name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      try {
        const data = await response.json();
        alert(data.error);
      } catch (error) {
        alert("Invalid details!");
      }
    }
  }
};

form.addEventListener("submit", signupFormHandler);
