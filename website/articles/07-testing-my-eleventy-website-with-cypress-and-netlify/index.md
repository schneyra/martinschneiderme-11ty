---
title: "Testing My Eleventy-Website With Cypress and Netlify"
layout: article
date: 2020-05-13
excerpt: 'Last time I wrote "this page is a repository consisting of some thrown-together and latenight-written code". Some tests should ensure that I don''t break to much when I''m, cleaning up the code. Here''s how I created a basic setup that runs my tests before every deployment.'
---

Although I know about the importance and benefits of a good code coverage I'm not the biggest fan of writing tests, especially the end-to-end type. Things often got complicated and slow in the past.

Automated testing is a big field in software development and their different types of tests, a lot of theory behind it and many tools that provide the necessary functions. I am by no means an expert in testing but I want to show you what I've learned the in the past days.

When I made my first attempt at this website with Sapper, there was already a folder named <code>cypress</code> in the starter-project and I fiddled around with the test runner it for some time. Getting started with <a href="https://www.cypress.io/">Cypress</a> was somehow easy and it was fun to see my tests run green. Why not try it with my Eleventy page?

Cypress is a JavaScript based Test Runner for End-to-End tests. It basically controls a browser, it can click on links and buttons and checks the results in the browser. Tests are run in Electron, but you can also use Firefox, Chrome or Chrome Canary if they are installed on your machine.

## Installation and First Tests

Nothing too fancy here. I just downloaded the client-software to my MacBook. I usually run my projects in a Node.js Docker container where Cypress can't run without some modifications and wasn't in the mood to run a bigger developer operation at that point. Cypress provides some containers with all required dependencies installed and I might have a look at that later.

Writing the first tests was really easy. First step was placing a basic configuration file named <code>cypress.json</code> into the root folder of my project. It defines the baseUrl that my Eleventy project runs at.

```json
{
    "baseUrl": "http://localhost:8080"
}
```

Then I've created a folder <code>cypress/integration</code> and placed a file named <code>homepage.js</code> in it. It contains the following code, that checks the homepage for the correct headline and tests the navigation.

```js
describe("Page - Homepage", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("has the correct headline", () => {
        cy.contains("h1", "Hey, my name is Martin!");
    });

    it("navigates to /about", () => {
        cy.get("nav a").contains("about").click();
        cy.url().should("include", "/about");
        cy.contains("h1", "Hello, again!");
    });

    it("navigates to /articles", () => {
        cy.get("nav a").contains("articles").click();
        cy.url().should("include", "/articles");
        cy.contains("h1", "Articles");
    });
});
```

To run the tests I simply had to open my project-folder and click the "Run all specs"-button. The result looks good:

![Screenshot of the cypress testrunner showing successful test for the homepage.](/articles/07-testing-my-eleventy-website-with-cypress-and-netlify/msme-first-tests.png)

Writing some more tests was actually a lot of fun. I quickly learned how to click a button and check data-attributes to test the colormode switcher. I've implemented some example tests to see if an article is displayed correctly, I let the browser scroll an article to the bottom to test the reading-indicator.

![Screenshot of the cypress testrunner showing successful test for several features.](/articles/07-testing-my-eleventy-website-with-cypress-and-netlify/msme-more-tests.png)

The documentation on <a href="https://docs.cypress.io/guides/getting-started/installing-cypress.html">installing Cypress</a> and <a href="https://docs.cypress.io/guides/getting-started/writing-your-first-test.html">writing and running the first tests</a> is pretty good and I'm going to have a closer look before I'll write more tests for sure. That's fine for now, let's go to the next step.

## Cypress and Netlify and Continous Testing

After all, tests are just as good as the interval they are running. With about six seconds runtime, the tests are too slow to run them on every change while developing. To be honest: I would always forget to run the tests before every commit and because of my odd docker setup a commit hook does not work for me. Luckily, I've read about <s>the beta version of</s> <a href="https://www.netlify.com/products/build/plugins/">Netflify Build Plugins</a> in their newsletter and had discovered <a href="https://github.com/cypress-io/netlify-plugin-cypress">the Cypress plugin</a> that runs tests after the build. Installation was really easy, it was mainly a <code>yarn add cypress netlify-plugin-cypress</code> and a new line in my <code>netlify.toml</code>. As I later found out, I could've just installed the plugin from the Netlify backend.

After a push into my repository the deployment started as usual. Netlify began building the latest version of the site and then the Cypress tests against it started. And failed directly. Somehow it wasn't possible to run <code>cy.visit("/");</code> more than once in a spec on the server. After some modifications the tests ran perfectly.

![A table showing the positive test results of my cypress test.](/articles/07-testing-my-eleventy-website-with-cypress-and-netlify/msme-cypress-netlify-complete.jpeg)

After hours and hours of fiddling with GitLab-CI and Docker containers in the past I am really impressed how easy the installation of the plugin was.

Now that the tests are running after each build I'm feeling more secure when making changes and restructuring the code. I'm really happy with the result of two or three evenings of tinkering and really look forward to writing some more and better tests and find out more about the possibilities Cypress provides.
