const getBaseUrl = () => {
    if (process.env.NETLIFY) {
        console.log(process.env.DEPLOY_PRIME_URL);

        if (process.env.CONTEXT === "production") {
            return "https://martinschneider.me";
        }

        return process.env.DEPLOY_PRIME_URL;
    }

    if (process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN) {
        return (
            "https://" +
            process.env.CODESPACE_NAME +
            "-8080." +
            process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
        );
    }
};

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
    webmention_io_token: process.env.WEBMENTION_IO_TOKEN,
    baseUrl: getBaseUrl()
};
