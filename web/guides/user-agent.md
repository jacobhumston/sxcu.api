# Setting/Modifying the User Agent

Setting your User Agent is very important, as this value is used to the set [User-Agent Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) on all requests made to the API.

**Important note:** The class `UserAgentClass` is not used by the request module internally and is only intended for type checking. Please use the exported variable `UserAgent` instead.

Setting the User Agent is very easy;
```js
import { UserAgent } from 'sxcu.api';

UserAgent.useDefault();
```

What exactly does `useDefault` do exactly? - It simply uses data from the package.json file found in sxcu.api as the User Agent. 

You can optionally set the `pathOverride` parameter of `useDefault` to the path of a different package.json.
```js
import { UserAgent } from 'sxcu.api';

UserAgent.useDefault('path/to/package.json');
```

You can also do