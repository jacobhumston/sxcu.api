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

We added native support for ESM in v2.0.0.

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

**Note:** Not all changes are documented here. Please refer to the [API documentation](https://sxcu.api.lovelyjacob.com) for more information.

```

```
