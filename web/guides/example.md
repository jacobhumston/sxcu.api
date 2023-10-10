# Example

Here is some examples of using sxcu.api to help you get started:

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

If you preferred categorized imports, then you can use **categorizeImports**.

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
