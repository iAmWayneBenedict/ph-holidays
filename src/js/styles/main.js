const githubBtn = document.querySelector(".github-btn");

githubBtn.addEventListener("mouseover", (event) =>
	githubBtn.firstElementChild.setAttribute("fill", "#00ADB5")
);
githubBtn.addEventListener("mouseout", (event) =>
	githubBtn.firstElementChild.setAttribute("fill", "none")
);
