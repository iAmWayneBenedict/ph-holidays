const showPassword = document.querySelector("#show-password");
const password = document.querySelector("#password");

// Show password
showPassword.addEventListener("change", (event) => {
	event.currentTarget.checked ? (password.type = "text") : (password.type = "password");
});
