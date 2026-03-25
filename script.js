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

// Generate stars
const starsContainer = document.getElementById("stars-container");
for (let i = 0; i < 120; i++) {
	const star = document.createElement("div");
	star.className = "star";
	const size = Math.random() * 2.5 + 0.5;
	star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --d: ${2 + Math.random() * 4}s;
      --o: ${0.1 + Math.random() * 0.5};
      animation-delay: ${Math.random() * 4}s;
    `;
	starsContainer.appendChild(star);
}

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
				revealObserver.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.12 },
);

reveals.forEach((el) => revealObserver.observe(el));

// Back to top
const backTop = document.getElementById("back-top");
window.addEventListener("scroll", () => {
	backTop.classList.toggle("show", window.scrollY > 400);
});

// Nav highlight on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
	let current = "";
	sections.forEach((s) => {
		if (window.scrollY >= s.offsetTop - 120) current = s.id;
	});
	navLinks.forEach((a) => {
		a.style.color =
			a.getAttribute("href") === "#" + current ? "var(--chalk)" : "";
	});
});
function copyEmail() {
	const email = "parmarnaman19@gmail.com";
	const btn = document.getElementById("email-btn");
	const originalText = btn.innerText;

	// Function to trigger the visual success state
	const showSuccess = () => {
		btn.classList.add("copied");
		btn.innerText = "Copied to clipboard! ✍️";
		setTimeout(() => {
			btn.classList.remove("copied");
			btn.innerText = originalText;
		}, 2000);
	};

	// Modern approach (works on HTTPS / live sites)
	if (navigator.clipboard && window.isSecureContext) {
		navigator.clipboard.writeText(email).then(showSuccess);
	} else {
		// Fallback approach (works for local file:// testing)
		let textArea = document.createElement("textarea");
		textArea.value = email;
		textArea.style.position = "fixed";
		textArea.style.left = "-999999px";
		textArea.style.top = "-999999px";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		try {
			document.execCommand("copy");
			showSuccess();
		} catch (err) {
			console.error("Fallback: Oops, unable to copy", err);
		}
		document.body.removeChild(textArea);
	}
}
