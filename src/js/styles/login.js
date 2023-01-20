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
		errorHandler.parentElement.classList.remove("hidden");
		errorHandler.classList.remove("text-red-500");
		errorHandler.parentElement.classList.remove("bg-red-100");
		errorHandler.parentElement.classList.add("flex");
		errorHandler.classList.add("text-green-500");
		errorHandler.parentElement.classList.add("bg-green-100");

		location.href = "/";
	} else {
		errorHandler.parentElement.classList.add("flex");
		errorHandler.parentElement.classList.remove("hidden");
		errorHandler.classList.add("text-red-500");
		errorHandler.parentElement.classList.add("bg-red-100");
		errorHandler.classList.remove("text-green-500");
		errorHandler.parentElement.classList.remove("bg-green-100");
	}

	errorHandler.textContent = data.msg;
});

const errorMessage = document.querySelector("#error-message");

const handleAuthError = () => {
	let params = new URLSearchParams(window.location.search);
	if (!params.get("error")) return;
	errorMessage.parentElement.classList.remove("hidden");
	errorMessage.parentElement.classList.add("flex");
	errorMessage.textContent = params.get("error");

	setTimeout(() => {
		errorMessage.parentElement.style.top = "-100%";
		errorMessage.parentElement.addEventListener("transitionend", (event) => {
			errorMessage.parentElement.classList.add("hidden");
			errorMessage.parentElement.classList.remove("flex");
		});
	}, 5000);
};

handleAuthError();
