# Uploading a File

This is a guide on how to upload a file.

## File Structure

The file structure of this guide is as follows:

![File Structure](/assets/file-structer-uploading-a-file-guide.png)

## Uploading a File

To upload the file, we need to use the `uploadFile` method. [Documentation Reference](https://sxcu.api.lovelyjacob.com/latest/functions/uploadFile.html)

```js
import { uploadFile } from 'sxcu.api';

uploadFile();
```

For the first argument of the function, we need to provide the path of the image.
In our case, it is `test.png` _or_ `./test.png`.

```js
uploadFile('test.png');
```

However, we are not finished yet! We need to get the result, and also handle errors.

```js
// NOTE: We use await because uploadFile returns a promise!
// ----- https://www.freecodecamp.org/news/guide-to-javascript-promises/
const result = await uploadFile('test.png').catch((err) => console.log('Something went wrong!', err));

console.log(result);
```

Execute the command `node index.mjs`, you will get an output similar to the following:

```json
{
    "id": "6xUyjTePe",
    "url": "https://sxcu.net/6xUyjTePe",
    "deletionUrl": "https://sxcu.net/api/files/delete/6xUyjTePe/ce7f3b7e...",
    "deletionToken": "ce7f3b7e...",
    "thumbnail": "https://sxcu.net/t/6xUyjTePe.png"
}
```

## Conclusion

Uploading a file with sxcu.api is extremely easy, however mistakes are easy to make!

If you need any help, feel free to create an issue in our GitHub repository.

Happy coding!
