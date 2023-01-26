Uploading a file using sxcu.api is really simple, however it is easy to make some mistakes.

We will start with the basics of using the method.

```js
const { files } = require('sxcu.api');

files.uploadFile();
```

In the above example, we are only requiring the `files` portion of the API wrapper.

When uploading a file, it's important you know the correct path to the file. You can include a file pretty much anywhere on your computer, however its recommend to only use files that are in the same directory as your project.

For this example, the file directory will be as bellow:

![File Directory](./images/file-dir.png)

Now that we know what the file is called, we can add it to the method. We have also added a function defined in `.then` to allow us to see the response returned by the API using `console.log()`.

```js
const { files } = require('sxcu.api');

files.uploadFile('test.png').then(function (data) {
    console.log(data);
});
```

If everything went well, you will receive the following output in your console:

```js
{
  id: '5TRElBtZl',
  url: 'https://sxcu.net/5TRElBtZl',
  deletionUrl: 'https://sxcu.net/api/files/delete/5TRElBtZl/a9344e8a-919f-4480-a51c-dbc01138b136',
  deletionToken: 'a9344e8a-919f-4480-a51c-dbc01138b136',
  thumbnail: 'https://sxcu.net/t/5TRElBtZl.png'
}
```

> _The above image has already been deleted._

When you upload images (or use any endpoint methods), you will want to use `catch` incase you encounter any errors.

```js
const { files, utility } = require('sxcu.api');

files
    .uploadFile('test.png')
    .then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.log(utility.resolveError(err));
    });
```

If we were to provide the wrong file name, the above would allow us to see the error in the console.

```js
{
  error: "Couldn't parse file: Error: ENOENT: no such file or directory, open 'not-a-test.png'",
  code: -1
}
```

The reason we included `utility.resolveError(...)` is because when we encounter errors such as wrong file names, we will **not** receive the standard `ErrorResponse`. Using the utility method **guarantees** an error response object 100% of the time.

If you would like to learn more about uploading and deleting files, please view [the documentation](https://lovely-experiences.github.io/sxcu.api/Files.html).

> **Last updated:** January 26th, 2023.<br>**Editors:** @jacobhumston
