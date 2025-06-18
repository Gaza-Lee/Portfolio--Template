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

    //Experience container
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
                left: -580,
                behavior: "smooth",
            });
        });

        pjRightArrow.addEventListener("click", ()=>{
            pjContainer.scrollBy({
                left: 580,
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
