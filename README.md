# sxcu.api

Node.js library to interact with the sxcu.net API.

sxcu.api was created to allow any developer of any skill set to easily create images, links, etc on sxcu.net without the hassle of learning the sxcu.net documentation directly.

> This module has **0** dependencies. _(excluding dev)_ [Check for yourself!](https://github.com/Lovely-Experiences/sxcu.api/blob/main/package.json)

## Links

**sxcu.api:** [Docs](https://sxcu.api.lovelyjacob.com) / [Github](https://github.com/Lovely-Experiences/sxcu.api) / [NPM](https://www.npmjs.com/package/sxcu.api)

**sxcu.net:** [Website](https://sxcu.net/) / [API Docs](https://sxcu.net/api/docs/) / [Discord](https://discord.gg/ZBcYQwMWTG) / [Donate](https://paypal.me/MisterFix)

## Example Usage

Here is an example of uploading a file.

```js
// Import the package.
import * as sxcu from 'sxcu.api';

// Set the request user agent to the default.
sxcu.useUserAgentDefault();

// Upload the file and log the response.
sxcu.uploadFile('image.png')
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
```

On `v1.3.0` we made the switch to ESM and TypeScript.
If you need to use commonjs, then you can use the import function.

Please view [commonjs-latest](https://github.com/Lovely-Experiences/sxcu.api/tree/commonjs-latest) for the latest commonjs version of sxcu.api.

```js
// Wrap code in an async function due to commonjs not having top-level await.
async function main() {
    const sxcu = await import('sxcu.api');
    // Use the package as normal...
}

main();
```

If you preferred categorized imports, then you can use `categorizeImports`.

```js
// Import the package.
import { categorizeImports } from 'sxcu.api';

// Categorize imports.
const sxcu = categorizeImports();

// Set the request user agent to the default.
sxcu.userAgent.useUserAgentDefault();

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
