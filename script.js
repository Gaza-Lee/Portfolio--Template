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
                left: 300,
                behavior: "smooth"
            });
        });
    }
});
