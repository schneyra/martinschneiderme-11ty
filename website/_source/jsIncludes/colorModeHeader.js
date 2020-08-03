// sets the data-attribute on the html-element if the user has used
// the color-mode-switch
(() => {
    let currentColorMode = localStorage.getItem("colorMode");

    if (currentColorMode) {
        document.documentElement.setAttribute(
            "data-user-color-scheme",
            currentColorMode,
        );
    }
})();
