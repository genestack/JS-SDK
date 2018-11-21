# Frontend development proxy server
This proxy server is used in development to apply your local changes of frontend-related assets
(`js` and `css` files) on top of the application that is running remotely on the Genestack Platform,
so you can see updates in your browser as soon as you save file (no build and no deploy needed).
Note that it maps files by their names, so you should point the proxy to those files that are going
to be actually included in final `.jar` file, e.g. already processed bundles.

## Basic usage

Install it globally:
```
npm install -g @genestack/ui-proxy
```
Then you could run the proxy as a shell command:
```
ui-proxy ./my-app/resources/assets
```
The first argument is the path to the folder with your `js` and `css` resources.
Now go to the URL that script suggests (usually it is
`http://localhost:3030/endpoint/application/run/genestack/signin`). And then go to your application,
e.g. `http://localhost:3030/endpoint/application/run/my-vendor/my-app`. When you edit your `.js` and
`.css` scripts now browser window will reload with your changes applied.

## Usage with NPM and `package.json`
Usually you want that everyone in your team could develop the application the way you do. For this
purpose you have to add the proxy to development dependencies of your project:
```
npm install --save-dev @genestack/ui-proxy
```
Now add to you package.json, to the `scripts` section following key-value pair:
```json
"start": "ui-proxy ./my-app/resources/assets"
```

Then you can run
```
npm start
```

### Note
> Usually you want to run proxy along with some bundler/transpiler, such as WebPack. You should
> run them simultaneously e.g.:
> ```json
>  "start": "webpack --output-filename ../resources/assets/bundle.js --watch & ui-proxy ../resources/assets; fg"
> ```

## Command parameters
By default proxy redirects requests to `https://platform.genestack.org`. You can specify other
server by passing to script `-s` argument:
```
npm start -- -s http://localhost:8080
```

Other arguments are:
* `-s` or `--server` for target server, aka backend (default is `https://platform.genestack.org`),
* `-p` or `--port` for proxy port (default is 3030),
* `--no-reload` if you want to disable browser auto-reload on each file save

## Important Notes

To make the proxy work, you should deploy your application to the target server first
(with `genestack-application-manager`). Make sure that files you want to serve are included to your
application (basically – listed in `<resources>` section of `applications.xml`) since the proxy
only **replaces** files, so some version of them should be presented on server.

Also, as of November 2018 Genestack Platform has server-side mininfication of assets that is enabled
by default. It converts all filenames to `all.js`/`all.css` so the proxy won't be able to apply your
local changes to remote resources if they are minified. To avoid this, you may need to disable
minification in Applications Manager:
1. Open the Platform **in a browser**
1. Open main menu ("☰" icon in top left corner)
1. Click **Manage Applications**
1. Once page is loaded, click the **Manage Applications** at the top dropdown and select **Settings**
1. Check **Disable minification globally** and hit **OK**
1. Go back to your application, your changes should be applied now
