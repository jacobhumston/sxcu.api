# Updating to v2.0.0

The package has been rewritten from the ground up in TypeScript, and this means that there are some breaking changes!

The biggest change is that we removed the method categories.

```js
// This is now wrong...
const { files } = require('sxcu.api');
files.uploadFile();

// This is now correct...
const { uploadFile } = require('sxcu.api');
uploadFile();

// But, if you prefer categories, then you can do this...
const { categorizeImports } = require('sxcu.api');
const categories = categorizeImports();
const files = categories.files;

files.uploadFile();
```

If you have been using ESM, then you are in luck because we now support ESM in the latest version!

```js
// Instead of...
const sxcu = await import('sxcu.api');
sxcu.files.uploadFile();

// You can now do...
import { uploadFile } from 'sxcu.api';
uploadFile();
```

If you are using TypeScript, then you can now import types from the package as you please.

```ts
// Import FileOptions type.
import { FileOptions } from 'sxcu.api';
```

However, some methods have been changed or renamed because of the rewrite. The best way to see what has changed is update the package and see what works. If you have any issues or questions, then please open an issue on the GitHub repository.
