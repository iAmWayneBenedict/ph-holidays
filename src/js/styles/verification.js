const codesContainer = document.querySelector(".code");
const counter = document.querySelector("#counter");
const resendBtn = document.querySelector("#resend-btn");
const verificationForm = document.querySelector("#verification-form");

const errorHandler = document.querySelector(".error-handler").firstElementChild;

const codes = Array.from(codesContainer.children);

for (let index = 0; index < codes.length; index++) {
	codes[index].addEventListener("paste", (event) => {
		let pasteData = event.clipboardData.getData("text");
		for (let i = 0; i < codes.length; i++) {
			codes[i].value = pasteData[i] ? pasteData[i] : "";
		}
	});

	codes[index].addEventListener("input", (event) => {
		let input = event.target.value;
		if (event.currentTarget.value.length > 1) {
			event.target.value = input.charAt(0);
		}

		if (event.currentTarget.value.length === 1) {
			if (index + 1 !== codes.length) {
				codes[index + 1].focus();
				return;
			}
			codes[index].blur();
		}

		const regex = /[0-9]/g;
		if (!regex.test(input)) {
			event.target.value = input.charAt(0);
		}
	});

	codes[index].addEventListener("keydown", (event) => {
		if (event.key !== "Backspace") return;

		if (event.currentTarget.value.length !== 0) return;

		if (index - 1 === -1) return;

		codes[index - 1].focus();
		codes[index - 1].value = "";
	});
}

const getCookie = (cname) => {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
};

const deleteCookie = (name) => {
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
};

const formatTime = (time) => {
	let minutes = Math.floor(time / 1000 / 60);
	let seconds = new Intl.NumberFormat("en-US", {
		minimumIntegerDigits: 2,
	}).format(Math.floor((time / 1000) % 60));

	return `${minutes}:${seconds}`;
};

let expiry = parseInt(getCookie("verification-expiry"));
const verificationCounter = () => {
	if (!getCookie("verification-expiry")) {
		counter.parentElement.classList.add("hidden");
		return;
	}
	// console.log(Date.now() > expiry);
	if (Date.now() > expiry) {
		deleteCookie("verification-expiry");
		deleteCookie("verification-code");
		counter.parentElement.classList.add("hidden");
		return;
	}

	let remainingTime = expiry - Date.now();
	counter.textContent = formatTime(remainingTime);
};

verificationCounter();

setInterval(() => {
	verificationCounter();
}, 1000);

resendBtn.addEventListener("click", (event) => {
	if (Date.now() < expiry) event.preventDefault();
	let hashed = window.location.href.replaceAll("+", "%2b");
	resendBtn.href = hashed + "&resend=true";
	resendBtn.click();
});

verificationForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	let val = "";

	for (const el of codes) {
		val += el.value;
	}

	const response = await fetch("/postVerification", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "same-origin",
		body: JSON.stringify({
			value: val,
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

		errorHandler.textContent = data.msg;
		location.href = data.redirect;
	} else {
		errorHandler.parentElement.classList.add("flex");
		errorHandler.parentElement.classList.remove("hidden");
		errorHandler.classList.add("text-red-500");
		errorHandler.parentElement.classList.add("bg-red-100");
		errorHandler.classList.remove("text-green-500");
		errorHandler.parentElement.classList.remove("bg-green-100");

		errorHandler.textContent = data.msg;
	}
});
