# Setting/Modifying the User Agent

Setting your User Agent is very important, as this value is used to the set [User-Agent Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) on all requests made to the API.

**This is done for you on the first request automatically, however using a custom User Agent is usually recommended.**

**Important note:** The class `UserAgentClass` is not used by the request module internally and is only intended for type checking. Please use the exported variable `UserAgent` instead.

Setting the User Agent is very straight forward.

```js
import { UserAgent } from 'sxcu.api';

UserAgent.set('user agent');
```

The format for User Agents is listed as the following on [sxcu.net's API documentation](https://sxcu.net/api/docs/#overview).

`sxcuUploader/$versionNumber (+$url)`

**Keep in mind that invalid User Agents will likely result in api errors!**

---

There is also an available method that uses a default User Agent based on sxcu.api's package.json file.

```js
import { UserAgent } from 'sxcu.api';

UserAgent.useDefault();
```

You can optionally set the `pathOverride` parameter of `useDefault` to the path of a different package.json file.

```js
import { UserAgent } from 'sxcu.api';

UserAgent.useDefault('path/to/package.json');
```