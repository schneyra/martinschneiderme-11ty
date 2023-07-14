module.exports = {
    random() {
        const segment = () => {
            return (((1 + Math.random()) * 0x10000) | 0)
                .toString(16)
                .substring(1);
        };
        return `${segment()}-${segment()}-${segment()}`;
    },
    now: Date.now(),
    environment: process.env.ELEVENTY_ENV,
    webmention_io_token: process.env.WEBMENTION_IO_TOKEN
};
