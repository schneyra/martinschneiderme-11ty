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

    // We need to take the header into account
    const headerHeight = document.querySelector("[data-js-header]")
        .clientHeight;
    const articleHeight = document.querySelector("[data-js-article]")
        .clientHeight;
    const scrollHeight = headerHeight + articleHeight;

    function updateReadingIndicator() {
        const scrollPosition = window.scrollY;
        const progressPercent = (scrollPosition / scrollHeight) * 100;
        const roundedPercent = Math.round(progressPercent);

        // scale is from 10 to 110, so there's always a litte line shown
        readingIndicator.value = progressPercent + 10;
        readingIndicator.textContent = `${roundedPercent}%`;
    }

    document.addEventListener("scroll", debounce(updateReadingIndicator), {
        passive: true,
    });
})();
