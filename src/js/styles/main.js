const githubBtn = document.querySelector(".github-btn");
const hamburgerBtn = document.querySelector(".hamburger");
const backdrop = document.querySelector(".backdrop");
const sideLinks = document.querySelectorAll(".side-links");

githubBtn.addEventListener("mouseover", (event) =>
	githubBtn.firstElementChild.setAttribute("fill", "#F49D1A")
);
githubBtn.addEventListener("mouseout", (event) =>
	githubBtn.firstElementChild.setAttribute("fill", "none")
);

hamburgerBtn.addEventListener("click", (event) => {
	backdrop.classList.toggle("hidden");
	hamburgerBtn.classList.toggle("active");
});

sideLinks.forEach((el) => [
	el.addEventListener("mouseover", (e) => {
		e.currentTarget.firstElementChild.setAttribute("fill", "#F49D1A");
	}),
]);
sideLinks.forEach((el) => [
	el.addEventListener("mouseleave", (e) => {
		e.currentTarget.firstElementChild.setAttribute("fill", "#878C8D");
	}),
]);
