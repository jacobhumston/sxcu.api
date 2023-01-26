# sxcu.api ![](https://img.shields.io/github/v/release/lovely-experiences/sxcu.api?style=flat-square) ![](https://img.shields.io/npm/v/sxcu.api?style=flat-square) ![](https://img.shields.io/github/package-json/v/lovely-experiences/sxcu.api?style=flat-square) ![](https://img.shields.io/github/license/lovely-experiences/sxcu.api?style=flat-square)

Node.js library to interact with the sxcu.net API.

Easily upload images with the sxcu.net API. Allowing you to get a publicly sharable URL for anyone you wish to view. You can learn more [here](https://sxcu.net/). This module has **no dependencies**.

As of **version 1.2.0**, this module supports **all** endpoints. 100% API coverage.

## Installation

To install, run the following command in your terminal of choice:

```console
npm i sxcu.api
```

**Important:** sxcu.api requires Node.js **v18** or above. Install the latest LTS version here: [https://nodejs.org/en/](https://nodejs.org/en/)

## Usage

You can find the documentation for sxcu.api [here](https://lovely-experiences.github.io/sxcu.api/). The documentation includes all type specifications as well as some tutorials. Please view the documentation before asking any questions.

If you end up needing assistance, you can [create an issue on GitHub](https://github.com/Lovely-Experiences/sxcu.api/issues/new).

Here's an example of using the `getFileMeta` method.

```js
const sxcu = require('sxcu.api');
sxcu.files
    .getFileMeta('1234abcd')
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
const uploadData = await sxcu.files.uploadFile("/a-test.png", options).catch(function (e) { console.log(e); });
console.log(uploadData);
```

### Requiring Specific Endpoints

Note that if you don't need all endpoint methods, you can require a specific one.

```js
const { files: sxcu } = require('sxcu.api');
// OR: const { files } = require("sxcu.api");

sxcu.getFileMeta('example');
```

### Handling Errors

When handling errors, you will receive two values, `error` and `code`. Error is the error message, and code is the number associated with the error. If the error is local, then the error code will be `-1`. If the error is a unknown status code returned by the API, then the error code will be `0`. Any other error codes are provided by the API.

```js
{ error: "Something went wrong...", code: -1 }
```

It's important to note that those values may not be present for errors that revolve around providing incorrect method parameters. You can use the utility method `resolveError` if you want an error response 100% of the time.

## Testing and/or Contributing

After you have installed the repository, please install all needed dependence's using `npm ci`.

You may create tests in the `test/index.js` file.

### Commands

We have a list of npm commands available in `package.json`.

| Command       | Explanation                                                                                                                                                           | Usage                     |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| Documentation | Generate documentation.                                                                                                                                               | `npm run generate-doc`    |
| Test          | Run the index.js file found in `test/index.js` using the global node command.                                                                                         | `npm run test`            |
| Local Test    | Same as the test command, however it uses a local version of node. To use this command, you must install Node.js and place the folder inside the repository's folder. | `npm run local-node-test` |
| Check         | Check for Eslint issues in all files under the source folder.                                                                                                         | `npm run check`           |
| Types         | Generate type definitions.                                                                                                                                            | `npm run generate-types`  |

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

You may view all available releases [here (GitHub)](https://github.com/Lovely-Experiences/sxcu.api/releases) and [here (NPM)](https://www.npmjs.com/package/sxcu.api?activeTab=versions). It's important to note that NPM releases do not contain the `/test` directory or the `/docs` directory, as well as the ignore files.
