# Command Line Interface

sxcu.api has a CLI included in the package. The CLI includes utility commands to interact with the sxcu.api library in the command line. A middleware server is also included, which can add some extra features to your uploader of choice.

## Installing & Execution

```bash
npm install -g sxcu.api
```

_You can replace `sxcu.api` with `"https://github.com/jacobhumston/sxcu.api.git#dev-build"` to install the latest development build instead._

Once installed, you should be able to run `sxcu` in your terminal. _(A terminal restart may be required.)_

```bash
sxcu
```

If you do not want to install the package globally, install locally instead.

```bash
npm install sxcu.api
```

To execute sxcu on a local install; you will need to include the path or use `npx`.

```bash
npx sxcu
```

```bash
./node_modules/.bin/sxcu
```

## Help Command and Options

You can use the `help` command to get a list of commands.

```bash
sxcu help
```

The CLI uses named arguments instead of positional for options.

```bash
sxcu help true # wrong
sxcu help --table true # correct
```

The format is simple; `sxcu <command> --<option name> <option value>`

You can include as many options as needed. For example:

```bash
sxcu server --port 80 --url-lifespan 60 --log true
```

To get a list of a command's options and their descriptions; use the `command` option of the `help` command.

```bash
sxcu help --command <command>
```

The help command also has an option to display the results as a table.

```bash
sxcu help --table true --command <command>
```

## Middleware Server

The CLI includes a middleware server for uploading files. The two main features are rate limit handling as well as multiple urls in the same response. This middleware can handle any application that sends a valid payload. **(This includes ShareX!)**

Instead of having to send image urls in multiple messages, you can provide a value for `--url-lifespan <number>`. This option determines how old an image can be before it's link is no longer included in responses. Each link is separated by a new line.

To start the server, all you need to do is provide the port.

```bash
sxcu server --port 5555
```

There is plenty of options available, which can be found using the help command.

**If you want to request a feature, create an issue on the GitHub repository!** - Or create a pull request with the changes already made. :^)
