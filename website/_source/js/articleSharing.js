// https://web.dev/web-share/
(() => {
    const sharingButton = document.querySelector("[data-sharing-button]");

    sharingButton.innerHTML = "share (can share: " + navigator.share + ")";

    sharingButton.addEventListener("click", () => {
        if (navigator.share) {
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
        }
    });
})();
