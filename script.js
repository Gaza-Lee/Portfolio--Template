function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".experience__details");
    const leftArrow = document.querySelector(".arrows span:first-child");
    const rightArrow = document.querySelector(".arrows span:last-child");

    if (container && leftArrow && rightArrow) {

        leftArrow.addEventListener("click", () => {
            container.scrollBy({
                left: -300,
                behavior: "smooth"
            });
        });

        rightArrow.addEventListener("click", () => {
            container.scrollBy({
                left: 600,
                behavior: "smooth"
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

window.addEventListener("DOMContentLoaded", () => {
    const leftArrow = document.querySelector(".arrw.left");
    const rightArrow = document.querySelector(".arrw.right");
    const pjContainer = document.querySelector(".pjs")

    if (leftArrow && rightArrow && pjContainer){
        leftArrow.addEventListener("click", () => {
            pjContainer.scrollBy({
                left: -500,
                behavior: smooth
            });
        });
        rightArrow.addEventListener("click", () =>{
            pjContainer.scrollBy({
                left: 500,
                behavior: smooth
            });
        });
    }
} )