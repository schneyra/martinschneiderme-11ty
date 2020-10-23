const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");

const generateOptimizedImages = async () => {
    await imagemin(["website/images/*.{jpg,png}"], {
        destination: "build/images",
        plugins: [imageminWebp({ quality: 50 })]
    });

    await imagemin(["website/images/photography/*.{jpg,png}"], {
        destination: "build/images/photography",
        plugins: [imageminWebp({ quality: 50 })]
    });

    console.log("Images optimized");
};

module.exports = generateOptimizedImages;
