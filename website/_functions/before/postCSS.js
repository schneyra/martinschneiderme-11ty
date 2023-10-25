const autoprefixer = require("autoprefixer");
const postcss = require("postcss");
const cssnano = require("cssnano");
const postcssNested = require("postcss-nested");
const postcssImport = require("postcss-import");
const litePreset = require("cssnano-preset-lite");
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

            await postcss([
                postcssImport,
                postcssNested,
                cssnano({ litePreset, plugins: [autoprefixer] })
            ])
                .process(css, {
                    from: sourceFile,
                    to: distFile
                })
                .then((result) => {
                    fs.writeFile(distFile, result.css, () => true);
                    console.log(`[msme] Wrote CSS (${filename}.css)`);
                })
                .catch((error) => {
                    if (error.name === "CssSyntaxError") {
                        process.stderr.write(
                            `[msme] Error writing CSS (${filename}.css) \n` +
                                error.message +
                                "\n" +
                                error.showSourceCode() +
                                "\n\n"
                        );
                    } else {
                        throw error;
                    }
                });
        })
    );
};
