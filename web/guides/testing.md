# Testing

sxcu.api's testing system is as follows:

```txt
test/ - Test directory.
    assets/ - Test assets directory.
        test.png - Testing image.
        test.sxcu - Testing sxcu file.
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

// Tests that make requests to the API are required to be inactive when not testing manually.
export const active = true; // If false, the test will be skipped.

export async function execute() {
    // test code
    console.log('my result!');

    // uh oh, error!
    throw 'oh no :(';
}
```

Make sure to log the result to the console so that it is added to the output file. It is
also important that you throw an error if the test fails.

If you have any questions, let us know!
