# sxcu.api

Node.js library to interact with the sxcu.net API. _([A cli is also included!](src/cli/README.md))_

sxcu.api was created to allow any developer of any skill set to easily create images, links, etc on sxcu.net without the hassle of learning the sxcu.net documentation directly.

> This module has **0** dependencies. _(excluding dev)_ [Check for yourself!](package.json)

## Links

**sxcu.api:** [Docs](https://sxcu.api.lovelyjacob.com) / [Github](https://github.com/Lovely-Experiences/sxcu.api) / [npm](https://www.npmjs.com/package/sxcu.api)

**sxcu.net:** [Website](https://sxcu.net/) / [API Docs](https://sxcu.net/api/docs/) / [Discord](https://discord.gg/ZBcYQwMWTG) / [Donate](https://paypal.me/MisterFix)

## Updating to v2.0.0 from v1.x.x

The guide for doing so can be found [here](web/guides/updating-to-v2.md).

If you run into any issues, please let us know [here](https://github.com/Lovely-Experiences/sxcu.api/issues/new).

## Installation

You can install sxcu.api using npm.

```bash
npm install sxcu.api
```

## Example Usage

Here is an example of uploading a file.

```js
// Import the package.
import * as sxcu from 'sxcu.api';

// Set the request user agent to the default.
sxcu.UserAgent.useDefault();

// Upload the file and log the response.
sxcu.uploadFile('image.png')
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
```

In `v2.0.0` we made the switch to ESM and TypeScript. **However, we still support CommonJS.**

```js
// Use CommonJS require.
const { uploadFile, UserAgent, categorizeImports } = require('sxcu.api');

UserAgent.useDefault();

uploadFile('your-img').then((res) => {
    console.log(res);
});

// It's important to note that you will need to use `categorizeImports`
// if you want the previous method categories. (ex; files.uploadFile())
```

If you preferred categorized imports, then you can use `categorizeImports`.

```js
// Import the package.
import { categorizeImports } from 'sxcu.api';

// Categorize imports.
const sxcu = categorizeImports();

// Set the request user agent to the default.
sxcu.userAgent.useDefault();

// Upload the file and log the response.
sxcu.files
    .uploadFile('image.png')
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
```

## Contributors

<!-- readme: collaborators,contributors,jacobhumston-school/- -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/jacobhumston">
            <img src="https://avatars.githubusercontent.com/u/57332486?v=4" width="100;" alt="jacobhumston"/>
            <br />
            <sub><b>Jacob Humston</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: collaborators,contributors,jacobhumston-school/- -end -->
