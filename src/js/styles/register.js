const registerForm = document.querySelector("#register-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

const errorHandler = document.querySelector(".error-handler").firstElementChild;

registerForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const response = await fetch("/postRegister", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "same-origin",
		body: JSON.stringify({
			email: email.value,
			password: password.value,
			"confirm-password": confirmPassword.value,
		}),
	});

	const data = await response.json();

	if (data.code === 200) {
		errorHandler.parentElement.classList.remove("hidden");
		errorHandler.classList.remove("text-red-500");
		errorHandler.parentElement.classList.remove("bg-red-100");
		errorHandler.parentElement.classList.add("flex");
		errorHandler.classList.add("text-green-500");
		errorHandler.parentElement.classList.add("bg-green-100");
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

// const googleAuthBtn = document.querySelector("#googleAuth");
// googleAuthBtn.addEventListener("click", googleAuth);
// const googleAuth = async () => {
// 	const googleProvider = new GoogleAuthProvider();
// 	try {
// 		const result = await signInWithPopup(auth, googleProvider);
// 		console.log(result);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };
