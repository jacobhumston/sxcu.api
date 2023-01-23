# sxcu.api ![](https://img.shields.io/github/v/release/lovely-experiences/sxcu.api?style=flat-square) ![](https://img.shields.io/npm/v/sxcu.api?style=flat-square) ![](https://img.shields.io/github/package-json/v/lovely-experiences/sxcu.api?style=flat-square) ![](https://img.shields.io/github/license/lovely-experiences/sxcu.api?style=flat-square)

Node.js library to interact with the sxcu.net API. 

Easily upload images with the sxcu.net API. Allowing you to get a publicly sharable URL for anyone you wish to view. You can learn more [here](https://sxcu.net/). This module has **no dependencies**.

**Warning** - This module is still being created and does not currently support every feature of the sxcu api.

## Installation

To install, run the following command in your terminal of choice:

```console
npm i sxcu.api
```

**Important:** sxcu.api requires Node.js **v18** or above. Install the latest LTS version here: [https://nodejs.org/en/](https://nodejs.org/en/)

## Usage

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

And here is an example of the `uploadFile` method.

```js
const sxcu = require("sxcu.api");
const options = { openGraphProperties: { siteName: "Test Image". discordHideUrl: false } };
const uploadData = await sxcu.files.uploadFile(__dirname + "/a-test.png", options).catch(function (e) { console.log(e); });
console.log(uploadData);
```

You must include `__dirname` before you provide the file if you don't want to provide the full path to the file. Note that the above code wont work unless you have a file named `a-test.png` in the same folder as your code.

### Requiring Specific Endpoints

Note that if you don't need all endpoint methods, you can require a specific one.

```js
const { files: sxcu } = require("sxcu.api");
// OR: const { files } = require("sxcu.api");

sxcu.getFileMeta("example");
```

### Handling Errors

When handling errors, you will receive two values, `error` and `code`. Error is the error message, and code is the number associated with the error. If the error is local, then the error code will be `-1`. If the error is a unknown status code returned by the API, then the error code will be `0`. Any other error codes are provided by the API.

```js
{ error: "Something went wrong...", code: -1 }
```

It's important to note that those values may not be present for errors that revolve around providing incorrect method parameters. You can use the utility method `resolveError()` if you want an error response 100% of the time.

## Links

### sxcu.api

-   **Docs:** [https://lovely-experiences.github.io/sxcu.api/](https://lovely-experiences.github.io/sxcu.api/)
-   **GitHub:** [https://github.com/Lovely-Experiences/sxcu.api](https://github.com/Lovely-Experiences/sxcu.api)
-   **NPM:** [https://www.npmjs.com/package/sxcu.api](https://www.npmjs.com/package/sxcu.api)

### sxcu.net

-   **Website:** [https://sxcu.net/](https://sxcu.net/)
-   **API Docs:** [https://sxcu.net/api/docs/](https://sxcu.net/api/docs/)
-   **Discord:** [https://discord.gg/ZBcYQwMWTG](https://discord.gg/ZBcYQwMWTG)
-   **Donate:** [https://paypal.me/MisterFix](https://paypal.me/MisterFix)

## Releases

You may view all available releases [here (GitHub)](https://github.com/Lovely-Experiences/sxcu.api/releases) and [here (NPM)](https://www.npmjs.com/package/sxcu.api?activeTab=versions).
