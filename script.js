// script.js

window.addEventListener("load", function () {
	document.getElementById("loading-overlay").classList.add("hidden");
});

document
	.getElementById("floatingButton")
	.addEventListener("click", function () {
		var linkContainer = document.getElementById("linkContainer");
		linkContainer.classList.toggle("hidden");
	});

// Add an event listener to each navigation link
var navLinks = document.querySelectorAll("#linkContainer a");
navLinks.forEach(function (link) {
	link.addEventListener("click", function () {
		// Hide the linkContainer when a navigation link is clicked
		var linkContainer = document.getElementById("linkContainer");
		linkContainer.classList.add("hidden");
	});
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
