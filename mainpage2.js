document.addEventListener("DOMContentLoaded", function() {
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const container = document.querySelector(".products-wrapper");

    const scrollStep = 435; // Ustaw krok przewijania

    prevButton.addEventListener("click", function() {
        container.scrollBy({
            left: -scrollStep,
            behavior: "smooth"
        });
    });

    nextButton.addEventListener("click", function() {
        container.scrollBy({
            left: scrollStep,
            behavior: "smooth"
        });
    });
});
