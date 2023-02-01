When using methods provided by the `sxcu.api` library, it's very important that you're not abusing the API endpoints. If you do, it could easily result in your IP being blacklisted, etc from using the API. Spamming the API will **not** get anything done faster.

> **Note:** You do not need to use the `getRateLimitPromise` when using utility methods, or when you know that you are not going to reach the API rate limits. (Ex; If you are only uploading a file every 2 minutes or so.)

Obeying the API rate limits can be accomplished in one line of code.

```js
const { utility } = require('sxcu.api');
// ... Uploading a file, etc...
await utility.getRateLimitPromise('all');
```

However, the above example isn't necessary if you know what method(s) are going to exceed the rate limit.

```js
const { utility } = require('sxcu.api');
// Uploading a file...
await utility.getRateLimitPromise('uploadFile');
// Uploading a file and creating a collection...
await utility.getRateLimitPromise(['uploadFile', 'createCollection']);
```

It's important to note that when using methods a lot, and not in order, you can accidentally exceed the global rate limit while waiting for the `uploadFile` rate limit for example. If this happens, calling `uploadFile` would error despite using the method described above. **It is best practice to _always_ assume something could go wrong when it comes to using external APIs, and to be prepared for it.** Using `catch()` and trying again once the rate limit is no longer in place is usually the best option.

If you just want to wait for the global rate limit and nothing else, you can provide no arguments while using the `getRateLimitPromise` method.

```js
const { utility } = require('sxcu.api');
// ... Doing whatever...
await utility.getRateLimitPromise();
```

> **Last updated:** February 1st, 2023.<br>**Editors:** @jacobhumston
