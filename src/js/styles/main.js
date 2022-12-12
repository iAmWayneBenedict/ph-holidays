const githubBtn = document.querySelector(".github-btn");
const hamburgerBtn = document.querySelector(".hamburger");
const backdrop = document.querySelector(".backdrop");

githubBtn.addEventListener("mouseover", (event) =>
	githubBtn.firstElementChild.setAttribute("fill", "#00ADB5")
);
githubBtn.addEventListener("mouseout", (event) =>
	githubBtn.firstElementChild.setAttribute("fill", "none")
);

hamburgerBtn.addEventListener("click", (event) => {
	backdrop.classList.toggle("hidden");
	hamburgerBtn.classList.toggle("active");
});
