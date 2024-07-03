<img src="https://raw.githubusercontent.com/jacobhumston/sxcu.api/banner/new-banner.png" alt="sxcu.api">

# sxcu.api

Node.js library to interact with the sxcu.net API. _([A cli is also included!](https://github.com/jacobhumston/sxcu.api/blob/main/src/cli/README.md))_

sxcu.api was created to allow any developer of any skill set to easily create images, links, etc on sxcu.net without the hassle of learning the sxcu.net documentation directly.

> This module has **0** dependencies. _(excluding dev)_ [Check for yourself!](https://github.com/jacobhumston/sxcu.api/blob/main/package.json)

## Links

**sxcu.api:** [Docs](https://sxcu.api.lovelyjacob.com) / [Github](https://github.com/Lovely-Experiences/sxcu.api) / [npm](https://www.npmjs.com/package/sxcu.api)

**sxcu.net:** [Website](https://sxcu.net/) / [API Docs](https://sxcu.net/api/docs/) / [Discord](https://discord.gg/ZBcYQwMWTG) / [Donate](https://paypal.me/MisterFix)

### Updating to v2.0.0 from v1.x.x

The guide for doing so can be found [here](https://sxcu.api.lovelyjacob.com/guides/updating-to-v2.html).

## Installation

You can install sxcu.api using npm.

```bash
npm install sxcu.api
```

If you would like to install the latest developer build, you can install from the `dev-build` branch.

```bash
npm install "https://github.com/jacobhumston/sxcu.api.git#dev-build"
```

## Documentation

The documentation includes api information and guides/tutorials.

-   Latest version: [sxcu.api.lovelyjacob.com](https://sxcu.api.lovelyjacob.com)
-   Development version: [sxcu.api.lovelyjacob.com/dev](https://sxcu.api.lovelyjacob.com/dev/)

## Example Usage

Here is an example of uploading a file.

```js
// Import the package.
import * as sxcu from 'sxcu.api';

// Set the request user agent to the default.
// This will be done for you on the first request if you don't do it yourself.
sxcu.UserAgent.useDefault();

// Upload the file and log the response.
sxcu.uploadFile('image.png')
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
```

In `v2.0.0` we made the switch to ESM and TypeScript. **However, we still support CommonJS.**

```js
// Use CommonJS's require method.
const { uploadFile, UserAgent, categorizeImports } = require('sxcu.api');

UserAgent.useDefault();

uploadFile('your-img')
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
```

If you preferred categorized imports, then you can use `categorizeImports`. This works with ESM and CommonJS.

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

Respecting rate limits has been made extremely easy, all you need to do is enable the request queue.

```js
// Import methods.
import { toggleRequestQueue } from 'sxcu.api';

// Enable the request queue.
toggleRequestQueue(true, true);
```

Need to make a custom request? It's pretty simple as well. The request method allows you to make requests that respect rate limits as well (as long as `toggleRequestQueue` is used beforehand).

```js
// Import methods.
import { request, toggleRequestQueue, resolveError } from 'sxcu.api';

// Enable the request queue.
toggleRequestQueue(true, true);

// Create your own request.
const response = await request({
    type: 'GET',
    statusErrors: [400, 429],
    baseUrl: 'https://sxcu.net/api/',
    path: `files/abc123`,
}).catch((error) => {
    throw resolveError(error);
});
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
