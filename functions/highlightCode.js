const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Prism = require("prismjs");

module.exports = (content) => {
    const dom = new JSDOM(content);

    let preElements = dom.window.document.querySelectorAll("pre");

    if (preElements.length) {
        preElements.forEach((pre) => {
            let code = pre.querySelector("code");

            if (code) {
                // get specified language from css-classname
                let codeLanguage = "html";
                const preClass = pre.className;

                var matches = preClass.match(/language-(.*)/);
                if (matches != null) {
                    codeLanguage = matches[1];
                }

                // for later use in CSS
                pre.dataset.language = codeLanguage;

                // set grammar that prism should use for highlighting
                let prismGrammar = Prism.languages.html;

                if (codeLanguage === "javascript" || codeLanguage === "js") {
                    prismGrammar = Prism.languages.javascript;
                }

                if (codeLanguage === "css") {
                    prismGrammar = Prism.languages.css;
                }

                // highlight code
                code.innerHTML = Prism.highlight(
                    code.textContent,
                    prismGrammar,
                    codeLanguage,
                );

                code.classList.add(`language-${codeLanguage}`);
            }
        });

        content = dom.window.document.body.innerHTML;
    }

    return content;
};
