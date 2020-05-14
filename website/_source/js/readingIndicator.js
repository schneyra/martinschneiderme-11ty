(() => {
    // debounce taken from
    // https://css-tricks.com/styling-based-on-scroll-position/
    const debounce = (fn) => {
        let frame;

        return (...params) => {
            if (frame) {
                cancelAnimationFrame(frame);
            }

            frame = requestAnimationFrame(() => {
                fn(...params);
            });
        };
    };

    const readingIndicator = document.querySelector(
        "[data-js-reading-indicator]",
    );

    const articleHeight = document.querySelector("[data-js-article]")
        .clientHeight;

    function updateReadingIndicator() {
        const scrollPosition = window.scrollY;
        const progressPercent = (scrollPosition / articleHeight) * 100;
        const roundedPercent = Math.round(progressPercent);

        // scale is from 10 to 110, so there's always a litte line shown
        readingIndicator.value = progressPercent + 10;
        readingIndicator.textContent = `${roundedPercent}%`;
    }

    document.addEventListener("scroll", debounce(updateReadingIndicator), {
        passive: true,
    });
})();
