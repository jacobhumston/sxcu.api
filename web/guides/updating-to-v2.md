# Updating to v2.0.0

Updating is pretty simple...

The only breaking change is that we removed the method categories.

```js
// This is now wrong...
const { files } = require('sxcu.api');
files.uploadFile();

// This is now correct...
const { uploadFile } = require('sxcu.api');
uploadFile();

// But, if you prefer categorizes, then you can do this...
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
