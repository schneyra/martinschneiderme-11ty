let body = document.querySelector("body");
let navigationButton = document.querySelector(".js-site-navigation-toggle");

navigationButton.addEventListener("click", (event) => {
    if (body.classList.contains("has-open-navigation")) {
        body.classList.remove("has-open-navigation");
        navigationButton.setAttribute("aria-expanded", false);
    } else {
        body.classList.add("has-open-navigation");
        navigationButton.setAttribute("aria-expanded", true);
    }
});
