# Testing

sxcu.api's testing system is as follows:

```txt
test/ - Test directory.
    assets/ - Test assets directory.
        test.png - Testing image.
        test.sxcu - Testing image.
    tests/ - Tests to be executed.
        <name>.js - Test file.
    index.js - Main test file.
    output.txt - Output file. (Git ignored.)
    other.js - Other test file. (Git ignored.)
    other.cjs - Other test file. [Commonjs] (Git ignored.)
```

Please do not add tests in your pull requests unless it is related to the pull request itself. (Make sure the test is formatted correctly!)

Creating a test is pretty easy:

```js
import * as sxcu from 'sxcu.api';

export const active = true; // If false, the test will be skipped.

export async function execute() {
    // test code
    console.log('my result!');
}
```

Make sure to output the result, so that it can be found in the output file!

If you have any questions, let us know!
