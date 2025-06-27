function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

document.addEventListener("DOMContentLoaded", () => {
    const expContainer = document.querySelector(".experience__details");
    const expLeftArrow = document.querySelector(".experience-arrows .left");
    const expRightArrow = document.querySelector(".experience-arrows .right");

    const pjContainer = document.querySelector(".pjs");
    const pjLeftArrow = document.querySelector(".project-arrows .left");
    const pjRightArrow = document.querySelector(".project-arrows .right");

    //Experience Arrows
    if (expContainer && expLeftArrow && expRightArrow){
        expLeftArrow.addEventListener("click", () => {
            console.log("Left")
            expContainer.scrollBy({
                left: -300,
                behavior: "smooth",
            });
        });

        expRightArrow.addEventListener("click", () =>{
            console.log("Right")
            expContainer.scrollBy({
                left: 300,
                behavior: "smooth",
            })
        })
    }

    //Project Arrows
    if (pjContainer && pjLeftArrow && pjRightArrow){
        pjLeftArrow.addEventListener("click", ()=>{
            console.log("left Pj")
            pjContainer.scrollBy({
                left: -400,
                behavior: "smooth",
            });
        });

        pjRightArrow.addEventListener("click", ()=>{
            pjContainer.scrollBy({
                left: 400,
                behavior: "smooth",
            });
        });
    }
   
});


document.addEventListener("DOMContentLoaded", function (){
    const trigger = document.getElementById("concept-trigger");
    const description = document.getElementById("description");

    trigger.addEventListener( "click", function() {
        description.classList.toggle("show");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Theme toggle
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

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
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}


document.addEventListener("DOMContentLoaded", function () {
    const faders = document.querySelectorAll('.fade-in-section');
    const appearOptions = { threshold: 0.15 };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));
});