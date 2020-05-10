// https://web.dev/web-share/
(() => {
    if (navigator.share) {
        // https://davidwalsh.name/detect-android
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        const sharingIconSelector = isAndroid
            ? "[data-js-sharing-icon-android]"
            : "[data-js-sharing-icon-ios]";
        const sharingIcon = document.querySelector(sharingIconSelector);
        sharingIcon.classList.remove("is-hidden");

        const sharingButton = document.querySelector(
            "[data-js-sharing-button]",
        );
        sharingButton.classList.remove("is-hidden");
        sharingButton.removeAttribute("aria-hidden");

        sharingButton.addEventListener("click", () => {
            let url = document.location.href;

            const canonicalElement = document.querySelector(
                "link[rel=canonical]",
            );

            if (canonicalElement !== null) {
                url = canonicalElement.href;
            }

            navigator
                .share({ url: url })
                .then(() => console.log("Successful share"))
                .catch((error) => console.log("Error sharing", error));
        });
    }
})();
