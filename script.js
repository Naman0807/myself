window.addEventListener("load", function () {
	document.getElementById("loading-overlay").classList.add("hidden");
});

window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	var scrollToTopBtn = document.getElementById("scrollToTopBtn");
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		scrollToTopBtn.style.display = "block";
	} else {
		scrollToTopBtn.style.display = "none";
	}
}

document
	.getElementById("scrollToTopBtn")
	.addEventListener("click", function () {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});

const animatedElements = document.querySelectorAll(".animated-element");

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("animate__fadeIn");
			observer.unobserve(entry.target);
		}
	});
});

animatedElements.forEach((element) => {
	observer.observe(element);
});

window.addEventListener("load", function () {
	document.getElementById("loading-overlay").classList.add("hidden");
});
