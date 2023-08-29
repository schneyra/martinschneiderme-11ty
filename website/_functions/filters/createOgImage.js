const Image = require("@11ty/eleventy-img");
const TextToSVG = require("text-to-svg");

const createOgImage = async (title) => {
    if (process.env.ELEVENTY_ENV !== "production") {
        return "/og-images-only-in-production.jpg";
    }

    if (!title) {
        console.error("[msme] OG image: No title given");
        return "/";
    }

    // split the given text into two parts
    let titleAsArray = title.split(" ");
    let firstPartOfTitle = [];

    if (titleAsArray.length > 3) {
        firstPartOfTitle = titleAsArray.splice(
            0,
            Math.floor(titleAsArray.length / 2)
        );
    }

    // Title
    let textToSVG = TextToSVG.loadSync(
        __dirname + "/../../fonts/LexendDeca-Regular.ttf"
    );

    const optionsTitle1 = {
        x: 70,
        y: 360,
        fontSize: 65,
        attributes: { fill: "hsl(210deg 50% 13%)" }
    };
    const optionsTitle2 = {
        x: 70,
        y: 435,
        fontSize: 65,
        attributes: { fill: "hsl(210deg 50% 13%)" }
    };

    const title1 = textToSVG.getPath(firstPartOfTitle.join(" "), optionsTitle1);
    const title2 = textToSVG.getPath(titleAsArray.join(" "), optionsTitle2);

    // Website
    const optionsWebsite = {
        x: 70,
        y: 550,
        fontSize: 45,
        attributes: { fill: "hsl(0deg 0% 7%)" }
    };

    const website = textToSVG.getPath("martinschneider.me", optionsWebsite);

    let svg = () => `
        <svg width="2400" height="1200" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            
            <defs>
                <linearGradient id="backgroundGradient" gradientTransform="rotate(140)">
                <stop offset="0"  stop-color="hsl(0deg 0% 98%)" />
                <stop offset="100%" stop-color="hsl(0deg 0% 94%)" />
                </linearGradient>
            </defs>

            <rect width="1200" height="600" fill="url('#backgroundGradient')"/> 
            <rect width="1060" height="3" x="70" y="480" fill="hsl(45deg 100% 63%)"/> 

            <rect width="150" height="150" x="985" y="75" fill="hsl(45deg 100% 63%)"/>

            <image
            x="980"
            y="70"
            width="150"
            height="150"
            xlink:href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QnwRXhpZgAATU0AKgAAAAgACwEPAAIAAAAGAAAAkgEQAAIAAAAKAAAAmAESAAMAAAABAAEAAAEaAAUAAAABAAAAogEbAAUAAAABAAAAqgEoAAMAAAABAAIAAAExAAIAAAAHAAAAsgEyAAIAAAAUAAAAugE8AAIAAAAKAAAAzodpAAQAAAABAAAA2IglAAQAAAABAAAI7gAAAABBcHBsZQBpUGhvbmUgMTMAAAAASAAAAAEAAABIAAAAATE2LjEuMQAAMjAyMzowMzoxMiAxNzozMzoyNQBpUGhvbmUgMTMAACSCmgAFAAAAAQAAAo6CnQAFAAAAAQAAApaIIgADAAAAAQACAACIJwADAAAAAQGQAACQAAAHAAAABDAyMzKQAwACAAAAFAAAAp6QBAACAAAAFAAAArKQEAACAAAABwAAAsaQEQACAAAABwAAAs6QEgACAAAABwAAAtaRAQAHAAAABAECAwCSAQAKAAAAAQAAAt6SAgAFAAAAAQAAAuaSAwAKAAAAAQAAAu6SBAAKAAAAAQAAAvaSBwADAAAAAQAFAACSCQADAAAAAQAQAACSCgAFAAAAAQAAAv6SFAADAAAABAAAAwaSfAAHAAAFjgAAAw6SkQACAAAABDQ4MACSkgACAAAABDQ4MACgAAAHAAAABDAxMDCgAgAEAAAAAQAAAMigAwAEAAAAAQAAAMiiFwADAAAAAQACAACjAQAHAAAAAQEAAACkAQADAAAAAQAAAACkAgADAAAAAQAAAACkAwADAAAAAQAAAACkBQADAAAAAQAaAACkBgADAAAAAQAAAACkMgAFAAAABAAACJykMwACAAAABgAACLykNAACAAAALAAACMKkYAADAAAAAQACAAAAAAAAAAAAAQAAACEAAAAIAAAABTIwMjM6MDM6MTIgMTc6MzM6MjUAMjAyMzowMzoxMiAxNzozMzoyNQArMDE6MDAAACswMTowMAAAKzAxOjAwAAAAAPXBAAAwlAAAOG8AACmdAAAwmwABB1wAAAAAAAAAAQAAADMAAAAKBrgFAwKlAsZBcHBsZSBpT1MAAAFNTQAuAAEACQAAAAEAAAAOAAIABwAAAgAAAAI8AAMABwAAAGgAAAQ8AAQACQAAAAEAAAABAAUACQAAAAEAAADMAAYACQAAAAEAAADIAAcACQAAAAEAAAABAAgACgAAAAMAAASkAAwACgAAAAIAAAS8AA0ACQAAAAEAAAAMAA4ACQAAAAEAAAAEAA8ACQAAAAEAAAACABAACQAAAAEAAAABABQACQAAAAEAAAAKABcAEAAAAAEAAATMABkACQAAAAEAAAAiABoAAgAAAAYAAATUAB0ACgAAAAEAAATaAB8ACQAAAAEAAAAAACAAAgAAACUAAATiACEACgAAAAEAAAUHACMACQAAAAIAAAUPACUAEAAAAAEAAAUXACYACQAAAAEAAAADACcACgAAAAEAAAUfACgACQAAAAEAAAABACsAAgAAACUAAAUnAC0ACQAAAAEAAAwZAC4ACQAAAAEAAAABAC8ACQAAAAEAAABUADMACQAAAAEAABAAADQACQAAAAEAAAAEADUACQAAAAEAAAADADYACQAAAAEAAABrADcACQAAAAEAAAAEADoACQAAAAEAAACNADsACQAAAAEAAAAAADwACQAAAAEAAAAEAD8ACQAAAAEAAAAAAEAABwAAAEIAAAVMAEEACQAAAAEAAAAAAEMACQAAAAEAAAAAAEQACQAAAAEAAAAAAEUACQAAAAEAAAAAAEYACQAAAAEAAAAAAEoACQAAAAEAAAACAAAAAJIBhwHVAdgBsgDlAOEA6gAgAvABRQF7ACUADgAKAAoAqAGiAeoB+QHZAGMBkwHMAD4CEwIcAA8ADwARAA8AEAC+AcUBAAIgAgMBsACgAKEApwBIABIAFAAVABMAEAAQANMB6gEYAlECWAGgAawBGgKPAh4ADwANAA0ADgAVABcA6AEKAjICcgLyAGUAjQDYAIcAHAAgAB8ANwAtAEgASQD5AScCTQKZAaYASwBeAIAAfwCIAD8AKAB4AEkAxQDVAAsCRQJxAs4AqABpAIwAfwCMAI4AbAAoAGIATADdAM8AHQJjAp8CxAC6AFgAewCSALAAvAB9ACsAjABLAIgATAAwAoECzAJ2AbsAfgCjAMAAugDJAEUAIwAqABUADwAZAEACmgLtAlsC8wBxALUAOQHxADcAEwAPAA4AGgAaABEAUgKsAvYCTwIhAqQBIAElASYBHwASABQAHAAaABQAEwBeArkC4AI/AisCegEHAdoAUwEzABQAFAASABIAEgAXAGoCxQLAAjICKwKIAeoBUgIXA1gCFwAUABIAFAAPABEAeQLcAqoCLQIhAmcBQwHwAsMD6wPUABkAEwASABQAEgCHAvwCsAI3AiECUwGVACMCtAPnA6cDIgKXACEAHQAbAJECCQOiAkkCTQJrAvsCZgOgA54DpAMlA0wCPgAzACcAYnBsaXN0MDDUAQIDBAUGBwhVZmxhZ3NVdmFsdWVZdGltZXNjYWxlVWVwb2NoEAETAAB8NebVorgSO5rKABAACBEXHSctLzg9AAAAAAAAAQEAAAAAAAAACQAAAAAAAAAAAAAAAAAAAD8AAEeFAB8Tuf/+sBMAAVJE///FBwACHY4AAAALAAAAIAAAAA0AAAAgAAAAAEJSmABxODI1cwAAADf/AAqkfTU3ODdGMkYwLTFBRjctNDY1OS04QkY5LTVFMUZDQUVBRkIyMQAAAAABAAAAAgAAAC0QAAAjAAAAAAAAAI4AA3MxAAAb/zhDRTRDMTU2LTYwNEMtNDYwRC1CMzM4LUIxRjFGQUU4QjgxMgBicGxpc3QwMNMBAgMEBQVRMFExUTIQASIAAAAACA8RExUXAAAAAAAAAQEAAAAAAAAABgAAAAAAAAAAAAAAAAAAABwADFHFAAf/5wAAADMAAAAKAAAACAAAAAUAAAAMAAAABUFwcGxlAGlQaG9uZSAxMyBiYWNrIGR1YWwgd2lkZSBjYW1lcmEgNS4xbW0gZi8xLjYAAA0AAQACAAAAAk4AAAAAAgAFAAAAAwAACZAAAwACAAAAAkUAAAAABAAFAAAAAwAACagABQABAAAAAQAAAAAABgAFAAAAAQAACcAADAACAAAAAksAAAAADQAFAAAAAQAACcgAEAACAAAAAlQAAAAAEQAFAAAAAQAACdAAFwACAAAAAlQAAAAAGAAFAAAAAQAACdgAHwAFAAAAAQAACeAAAAAAAAAAMgAAAAEAAAAoAAAAAQAADUcAAABkAAAABwAAAAEAAAASAAAAAQAABgQAAABkAAzB3AAADT8AGMzFAA//+wARZ4UAABMHABFnhQAAEwcAAkc1AAAwjP/hCllodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0wMy0xMlQxNzozMzoyNS40ODAiIHhtcDpDcmVhdG9yVG9vbD0iMTYuMS4xIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wMy0xMlQxNzozMzoyNSIgZXhpZjpDb21wb3NpdGVJbWFnZT0iMiIgcGhvdG9zaG9wOkRhdGVDcmVhdGVkPSIyMDIzLTAzLTEyVDE3OjMzOjI1LjQ4MCIvPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz4A/+0AeFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAA/HAFaAAMbJUccAgAAAgACHAI/AAYxNzMzMjUcAj4ACDIwMjMwMzEyHAI3AAgyMDIzMDMxMhwCPAAGMTczMzI1ADhCSU0EJQAAAAAAEG+XPT4o4ciMdq+HITiGBE3/4gIoSUNDX1BST0ZJTEUAAQEAAAIYYXBwbAQAAABtbnRyUkdCIFhZWiAH5gABAAEAAAAAAABhY3NwQVBQ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" />
            
            ${title1}
            ${title2}
            ${website}
        </svg>`;

    var buffer = Buffer.from(svg());

    let options = {
        widths: [2400],
        formats: ["jpg"],
        outputDir: "./_site/images/og",
        urlPath: "/images/og/"
    };

    const ogImage = await Image(buffer, options);
    console.log(`[msme] OG image generated: ${title}`);
    return ogImage.jpeg[0].url;
};

module.exports = async (title, callback) => {
    const ogImageUrl = await createOgImage(title);
    callback(null, ogImageUrl);
};
