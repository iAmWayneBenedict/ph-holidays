const codesContainer = document.querySelector(".code");

const codes = Array.from(codesContainer.children);

for (let index = 0; index < codes.length; index++) {
	codes[index].addEventListener("paste", (event) => {
		let pasteData = event.clipboardData.getData("text");
		for (let i = 0; i < codes.length; i++) {
			codes[i].value = pasteData[i];
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
		if (event.code !== "Backspace") return;

		if (event.currentTarget.value.length === 0) {
			if (index - 1 !== -1) {
				codes[index - 1].focus();
				codes[index - 1].value = "";
				return;
			}
		}
	});
}
