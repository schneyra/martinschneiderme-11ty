const autoprefixer = require("autoprefixer");
const postcss = require("postcss");
const cssnano = require("cssnano");
const postcssNested = require("postcss-nested");
const postcssImport = require("postcss-import");
const fs = require("fs/promises");

module.exports = async () => {
    await fs.mkdir("./website/dist/", { recursive: true }, (err, path) => {
        if (err) throw err;
    });

    const sourceFiles = ["msme", "prism"];

    await Promise.all(
        sourceFiles.map(async (filename) => {
            const sourceFile = `./website/_source/css/${filename}.css`;
            const distFile = `./website/dist/${filename}.min.css`;

            const css = await fs.readFile(sourceFile, (err, css) => {
                if (err) throw err;
                return css;
            });

            await postcss([postcssImport, autoprefixer, postcssNested, cssnano])
                .process(css, {
                    from: sourceFile,
                    to: distFile
                })
                .then((result) => {
                    fs.writeFile(distFile, result.css, () => true);
                    console.log(`[msme] Wrote CSS (${filename}.css)`);
                });
        })
    );
};
