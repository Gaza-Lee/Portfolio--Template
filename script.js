function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    if (menu && icon) {
        menu.classList.toggle("open");
        icon.classList.toggle("open");
    }
}

// Experience and Project Arrows
function setupArrows() {
    // Experience
    const expContainer = document.querySelector(".experience__details");
    const expLeftArrow = document.querySelector(".experience-arrows .left");
    const expRightArrow = document.querySelector(".experience-arrows .right");
    if (expContainer && expLeftArrow && expRightArrow) {
        expLeftArrow.addEventListener("click", () => {
            expContainer.scrollBy({ left: -300, behavior: "smooth" });
        });
        expRightArrow.addEventListener("click", () => {
            expContainer.scrollBy({ left: 300, behavior: "smooth" });
        });
    }
    // Projects
    const pjContainer = document.querySelector(".pjs");
    const pjLeftArrow = document.querySelector(".project-arrows .left");
    const pjRightArrow = document.querySelector(".project-arrows .right");
    if (pjContainer && pjLeftArrow && pjRightArrow) {
        pjLeftArrow.addEventListener("click", () => {
            pjContainer.scrollBy({ left: -400, behavior: "smooth" });
        });
        pjRightArrow.addEventListener("click", () => {
            pjContainer.scrollBy({ left: 400, behavior: "smooth" });
        });
    }
}

// Concept Toggle
function setupConceptToggle() {
    const trigger = document.getElementById("concept-trigger");
    const description = document.getElementById("description");
    if (trigger && description) {
        trigger.addEventListener("click", function () {
            description.classList.toggle("show");
        });
    }
}

// Theme Toggle
function setupThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    if (!themeToggle) return;

    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            themeToggle.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    });
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Fade-in Animation on Scroll
function setupFadeInSections() {
    const faders = document.querySelectorAll('.fade-in-section');
    if (!faders.length) return;
    const appearOptions = { threshold: 0.15 };
    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));
}

// Contact Form Validation
function setupContactForm() {
    const form = document.querySelector("form");
    if (!form) return;
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const name = form.querySelector('input[placeholder="Name"]').value.trim();
        const email = form.querySelector('input[placeholder="Email/Phone"]').value.trim();
        const subject = form.querySelector('input[placeholder="Subject"]').value.trim();
        const message = form.querySelector('textarea').value.trim();
        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }
        // Simple email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            const response = await fetch("https://localhost:5001/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message })
            });
            const data = await response.json();
            if (response.ok && data.success) {
                alert("Message sent!");
                form.reset();
            } else {
                alert("Failed to send message: " + (data.message || "Unknown error"));
            }
        } catch (err) {
            alert("Could not connect to backend: " + err.message);
        }
    });
}

// Typewriter Effect for Fullname
function setupTypewriter() {
    const el = document.getElementById("fullname");
    if (!el) return;
    const text = el.textContent.trim();
    el.textContent = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            el.textContent += text[i++];
            setTimeout(type, 80);
        }
    }
    type();
}

// Copy Email to Clipboard
function setupCopyEmail() {
    const email = document.querySelector(".my_email_n_phone .email p");
    if (!email) return;
    const original = email.textContent.trim();
    email.style.cursor = "pointer";
    email.title = "Click to copy";
    email.addEventListener("click", function () {
        navigator.clipboard.writeText(original);
        email.textContent = "Copied!";
        setTimeout(() => email.textContent = original, 1200);
    });
}

// Show/Hide Scroll-to-Top Button
function setupScrollToTopButton() {
    const btn = document.getElementById("scroll-to-top");
    if (!btn) return;
    let ticking = false;
    window.addEventListener("scroll", function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                btn.style.display = window.scrollY > 200 ? "flex" : "none";
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Smooth Anchor Scrolling
function setupSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

function setupContactForm() {
    const form = document.querySelector("form");
    if (!form) return;
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const name = form.querySelector('input[placeholder="Name"]').value.trim();
        const email = form.querySelector('input[placeholder="Email/Phone"]').value.trim();
        const subject = form.querySelector('input[placeholder="Subject"]').value.trim();
        const message = form.querySelector('textarea').value.trim();
        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }

        // Send to backend API
        try {
            const response = await fetch("https://localhost:5001/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message
                })
            });
            const data = await response.json();
            if (response.ok && data.success) {
                alert("Message sent!");
                form.reset();
            } else {
                alert("Failed to send message: " + (data.message || "Unknown error"));
            }
        } catch (err) {
            alert("Could not connect to backend: " + err.message);
        }
    });
}

// Initialize all features
document.addEventListener("DOMContentLoaded", function () {
    setupArrows();
    setupConceptToggle();
    setupThemeToggle();
    setupFadeInSections();
    setupContactForm();
    setupTypewriter();
    setupCopyEmail();
    setupScrollToTopButton();
    setupSmoothAnchors();
    setupContactForm() 
});