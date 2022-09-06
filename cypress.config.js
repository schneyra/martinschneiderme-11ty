const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: "http://localhost:8080",
        video: false,
        projectId: "j2nfw9",
        chromeWebSecurity: false
    }
});
