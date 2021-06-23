// sets the data-attribute on the html-element if the user has used
// the color-mode-switch
(() => {
    const currentColorMode = localStorage.getItem("colorMode");
    const metaTagThemeColor = document.querySelector('[name="theme-color"]');
    const lightColor = "hsl(0, 0%, 95%)";
    const darkColor = "hsl(216, 25%, 12%)";

    if (currentColorMode) {
        document.documentElement.setAttribute(
            "data-user-color-scheme",
            currentColorMode
        );

        if (currentColorMode === "light") {
            metaTagThemeColor.content = lightColor;
        } else {
            metaTagThemeColor.content = darkColor;
        }
    } else {
        if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            metaTagThemeColor.content = lightColor;
        } else {
            metaTagThemeColor.content = darkColor;
        }
    }
})();
