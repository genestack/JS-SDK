# Frontend development proxy server
This proxy server is used in development process to run local files on top of remote application.
It maps all `.js` and `.css` resources to their local copies, so you can see updates in your browser
as soon as you save file (no build and no deploy needed).
This package does not build your application. You need to run your own script simultaneously, and this one will catch changes in your bundle and rerun the app.

### Installation
```
npm install --save-dev ui-proxy
```


### Basic usage

Add to you package.json, to the `scripts` section following key-value pair:
```
"start": "ui-proxy --build-path='./../path-to-built~-local-files'"
```
Then you can run
```
npm start
```
and go to url that script suggests (usually it is
`http://localhost:3030/endpoint/application/run/genestack/signin`). Now you can edit scripts
in your bundles, and bundles will rebuild automatically. By default proxy redirects requests to
`https://internal-dev.genestack.com`. You can specify other server by passing to script `-s`
argument:
```
npm start -- -s http://localhost:8080
```
Other arguments are

* `--build-path` for path where to put bundles (required)
* `-s` or `--server` for target server, aka backend (default is `https://internal-dev.genestack.com`),
* `-p` or `--port` for proxy port (default is 3030),
* `--static-port` for port of static server (default is 3459)
* `--livesync-port` for port of reload websocket server (default is 29272)
* `--no-reload` if you want to disable browser auto-reload on each file save

### Important Notes

To make this proxy work, you should upload your application to the platform via `genestack-application-manager`
Also, Genestack has server-side mininfication of sources that is enabled by default and ui-proxy won't be able to apply your local changes to remote resources if they are minified. To avoid this, you may need to disable minification in Applications Manager:
1. **In a browser** on internal-dev (or whatever target server you specified with `-s` option)
1. Open Dock (aka Main Menu) by clicking on icon in top left corner
1. Click **Manage Applications**
1. Once page is loaded, click the **Manage Applications** at the top dropdown and select **Settings**
1. Check **Disable minification globally** and hit **OK**
1. Go back to your application, your changes should be applied now
