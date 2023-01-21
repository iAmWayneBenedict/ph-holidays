const codesContainer = document.querySelector(".code");
const counter = document.querySelector("#counter");
const resendBtn = document.querySelector("#resend-btn");

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

	if (Date.now() > expiry) {
		deleteCookie("verification-expiry");
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

	resendBtn.href = window.location.href + "&resend=true";
	resendBtn.click();
});
