function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    if (menu && icon) {
        menu.classList.toggle("open");
        icon.classList.toggle("open");
    }
}

function setupArrows() {
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

function setupConceptToggle() {
    const triggers = document.querySelectorAll(".concept-trigger");
    triggers.forEach(trigger => {
        trigger.addEventListener("click", function () {
            const currentDescription = this.closest(".companies").querySelector(".experience__description");
            const isAlreadyOpen = currentDescription.classList.contains("show");
            document.querySelectorAll(".experience__description.show").forEach(desc => {
                desc.classList.remove("show");
            });
            if (!isAlreadyOpen) {
                currentDescription.classList.add("show");
                setTimeout(() => {
                    currentDescription.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }, 100);
            }
        });
    });
}

function setupThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    if (!themeToggle) return;

    const sunIcon = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    const moonIcon = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    const applyIcon = () => {
        themeToggle.innerHTML = body.classList.contains("dark-mode") ? sunIcon : moonIcon;
    };

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }
    applyIcon();

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        const isDark = body.classList.contains("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        applyIcon();
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupFadeInSections() {
    const faders = document.querySelectorAll(".fade-in-section");
    if (!faders.length) return;
    const appearOptions = { threshold: 0.15 };
    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));
}

function setupContactForm() {
    const form = document.querySelector("form");
    if (!form) return;
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const name = form.querySelector('[name="name"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const subject = form.querySelector('[name="subject"]').value.trim();
        const message = form.querySelector('[name="message"]').value.trim();
        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }
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
});
