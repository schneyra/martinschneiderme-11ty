// https://web.dev/web-share/
(() => {
    if (navigator.share) {
        const sharingButton = document.querySelector("[data-sharing-button]");

        sharingButton.classList.remove("is-hidden");

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
