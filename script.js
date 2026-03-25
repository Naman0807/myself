// Initialize on page load
window.addEventListener("load", function () {
	const loadingOverlay = document.getElementById("loading-overlay");
	if (loadingOverlay) {
		loadingOverlay.classList.add("hidden");
	}
});

window.onscroll = function () {
	// Scroll functionality handled by back-to-top button logic below
};

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

// ==================== HAMBURGER MENU ====================
const hamburgerBtn = document.getElementById("hamburger-btn");
const navDropdown = document.getElementById("nav-dropdown");
const navLinksInDropdown = document.querySelectorAll(
	".nav-dropdown .nav-links a",
);

// Toggle menu on hamburger click
hamburgerBtn.addEventListener("click", () => {
	hamburgerBtn.classList.toggle("active");
	navDropdown.classList.toggle("active");

	// Update aria-expanded for accessibility
	const isExpanded = hamburgerBtn.classList.contains("active");
	hamburgerBtn.setAttribute("aria-expanded", isExpanded);
});

// Close menu when a link is clicked
navLinksInDropdown.forEach((link) => {
	link.addEventListener("click", closeMenu);
});

// Close menu on ESC key
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && navDropdown.classList.contains("active")) {
		closeMenu();
	}
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
	if (!e.target.closest("nav") && navDropdown.classList.contains("active")) {
		closeMenu();
	}
});

// Close menu when viewport expands to desktop
let lastWindowWidth = window.innerWidth;
window.addEventListener("resize", () => {
	const currentWidth = window.innerWidth;
	if (lastWindowWidth < 768 && currentWidth >= 768) {
		// Viewport expanded to desktop
		closeMenu();
	}
	lastWindowWidth = currentWidth;
});

function closeMenu() {
	hamburgerBtn.classList.remove("active");
	navDropdown.classList.remove("active");
	hamburgerBtn.setAttribute("aria-expanded", "false");
}

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
