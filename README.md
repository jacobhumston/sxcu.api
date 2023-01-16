# sxcu.api

Node.js library to interact with the sxcu.net API.

**Warning** - This module is still being created and does not currently support every feature of the sxcu api.

## Installation

To install, run the following command in your terminal of choice:

```console
npm i sxcu.api
```

**Important:** sxcu.api requires Node.js v18+!

### Usage

You can find the documentation for sxcu.api [here](https://lovely-experiences.github.io/sxcu.api/).

Here's an example of using the `getFileMeta` method.

```js
const sxcu = require("sxcu.api");
sxcu.files
    .getFileMeta("1234abcd")
    .then((metaData) => {
        console.log(`File URL: ${metaData.url}`);
    })
    .catch((error) => {
        // Always listen for errors!
        console.error(error);
    });
```

Note that if you don't need all endpoint methods, you can require a specfic one.

```js
const { files: sxcu } = require("sxcu.api");
// OR: const { files } = require("sxcu.api");

sxcu.getFileMeta("example"); // will work
sxcu.listSubdomains("example"); // will NOT work
```

### Links

#### sxcu.api

-   **Docs:** [https://lovely-experiences.github.io/sxcu.api/](https://lovely-experiences.github.io/sxcu.api/)
-   **GitHub:** [https://github.com/Lovely-Experiences/sxcu.api](https://github.com/Lovely-Experiences/sxcu.api)
-   **NPM:** [https://www.npmjs.com/package/sxcu.api](https://www.npmjs.com/package/sxcu.api)

#### sxcu.net

-   **Website:** [https://sxcu.net/](https://sxcu.net/)
-   **API Docs:** [https://sxcu.net/api/docs/](https://sxcu.net/api/docs/)
-   **Discord:** [https://discord.gg/ZBcYQwMWTG](https://discord.gg/ZBcYQwMWTG)
-   **Donate:** [https://paypal.me/MisterFix](https://paypal.me/MisterFix)
