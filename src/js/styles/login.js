const showPassword = document.querySelector("#show-password");
const password = document.querySelector("#password");
const loginForm = document.querySelector("#login-form");
const email = document.querySelector("#email");
const errorHandler = document.querySelector(".error-handler").firstElementChild;

// Show password
showPassword.addEventListener("change", (event) => {
	event.currentTarget.checked ? (password.type = "text") : (password.type = "password");
});

loginForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	let response = await fetch("/postLogin", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "same-origin",
		body: JSON.stringify({
			email: email.value,
			password: password.value,
		}),
	});

	let data = await response.json();

	if (data.code === 200) {
		errorHandler.classList.remove("hidden");
		errorHandler.classList.remove("text-red-500");
		errorHandler.parentElement.classList.remove("bg-red-100");
		errorHandler.classList.add("flex");
		errorHandler.classList.add("text-green-500");
		errorHandler.parentElement.classList.add("bg-green-100");
	} else {
		errorHandler.classList.remove("flex");
		errorHandler.classList.add("hidden");
		errorHandler.classList.add("text-red-500");
		errorHandler.parentElement.classList.add("bg-red-100");
		errorHandler.classList.remove("text-green-500");
		errorHandler.parentElement.classList.remove("bg-green-100");
	}

	errorHandler.textContent = data.msg;
});
