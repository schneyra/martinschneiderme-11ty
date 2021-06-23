(() => {
    const toggleButton = document.querySelector(
        "[data-js-colormode-togglebutton]"
    );

    const toggleButtonLabel = document.querySelector(
        "[data-js-colormode-togglebutton-label]"
    );

    function setToggleButtonLabel(label) {
        toggleButtonLabel.innerHTML = label;
    }

    function getCSSCustomProp(propKey) {
        let response = getComputedStyle(
            document.documentElement
        ).getPropertyValue(propKey);

        if (response.length) {
            response = response.replace(/\"/g, "").trim();
        }

        return response;
    }

    function toggleColorMode() {
        let currentColorMode = localStorage.getItem("colorMode");
        const osColorMode = getCSSCustomProp("--os-color-mode");
        const metaTagThemeColor = document.querySelector(
            '[name="theme-color"]'
        );
        const lightColor = "hsl(0, 0%, 95%)";
        const darkColor = "hsl(216, 25%, 12%)";

        // Switches between "auto" and "opposite of 'auto'"
        switch (currentColorMode) {
            case null:
                if (osColorMode === "dark") {
                    currentColorMode = "light";
                    nextColorModeLabel = "auto";
                } else {
                    currentColorMode = "dark";
                    nextColorModeLabel = "light";
                }
                break;
            case "dark":
                if (osColorMode === "light") {
                    currentColorMode = null;
                    nextColorModeLabel = "dark";
                } else {
                    currentColorMode = "light";
                    nextColorModeLabel = "auto";
                }
                break;
            case "light":
                if (osColorMode === "dark") {
                    currentColorMode = null;
                    nextColorModeLabel = "light";
                } else {
                    currentColorMode = "dark";
                    nextColorModeLabel = "auto";
                }
                break;
        }

        if (currentColorMode) {
            // set the state on the <html>-element to toggle mode
            document.documentElement.setAttribute(
                "data-user-color-scheme",
                currentColorMode
            );

            if (currentColorMode === "light") {
                metaTagThemeColor.content = lightColor;
            } else {
                metaTagThemeColor.content = darkColor;
            }

            // save the state for later visits
            localStorage.setItem("colorMode", currentColorMode);
        } else {
            // remove settings to fall back to OS-preference
            document.documentElement.removeAttribute("data-user-color-scheme");
            localStorage.removeItem("colorMode");

            if (window.matchMedia("(prefers-color-scheme: light)").matches) {
                metaTagThemeColor.content = lightColor;
            } else {
                metaTagThemeColor.content = darkColor;
            }
        }

        setToggleButtonLabel(nextColorModeLabel);
    }

    toggleButton.addEventListener("click", toggleColorMode);

    const onMountColorMode = localStorage.getItem("colorMode");

    switch (onMountColorMode) {
        case null:
            nextColorModeLabel = "dark";
            break;
        case "dark":
            nextColorModeLabel = "light";
            break;
        case "light":
            nextColorModeLabel = "auto";
            break;
    }

    setToggleButtonLabel(nextColorModeLabel);
})();
