# sxcu.api

Node.js library to interact with the sxcu.net API.

## Installation

To install, run the following command in your terminal of choice:

```console
npm i sxcu.api
```

### Usage

You can find the documentation for sxcu.api [here](https://lovely-experiences.github.io/sxcu.api/).

Using methods provided by sxcu.api is pretty simple!

Here's an example using the `getFileMeta` method.

```js
const sxcu = require("sxcu.api");
sxcu.File.getFileMeta("1234abcd")
    .then((metaData) => {
        console.log(`File URL: ${metaData.url}`);
    })
    .catch((error) => {
        // Always listen for errors!
        console.error(error);
    });
```

### Links

#### sxcu.api

-   **Docs:** https://lovely-experiences.github.io/sxcu.api/
-   **GitHub:** https://github.com/Lovely-Experiences/sxcu.api
-   **NPM:** https://www.npmjs.com/package/sxcu.api

#### sxcu.net

-   **Website:** https://sxcu.net/
-   **API Docs:** https://sxcu.net/api/docs/
-   **Discord:** https://discord.gg/ZBcYQwMWTG
-   **Donate:** https://paypal.me/MisterFix
