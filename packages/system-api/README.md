# Genestack system APIs to use in browser

## Installation
```
npm install @genestack/system-api
```

### loadApplication()
Returns a `Promise` that resolves when all application resources are loaded. `Promise` resolution
handler is called with the object that represents current application.

```javascript
import {loadApplication} from '@genestack/system-api';

loadApplication().then((app) => {
    console.log(app.applicationId); // "your-vendor/your-app-id"
})
```

#### Application object properties
| Name                | Type       | Comment                                                                                 |
|---------------------|------------|-----------------------------------------------------------------------------------------|
| `applicationId`       | string     | `your-vendor/your-app-id`                                                               |
| `parameters`          | Array<any> | Array of parameters app was loaded with (usually list of file accessions)               |
| `action`              | string     | Action app was loaded with (e.g. `openInBrowser`, `openFile`, `createFromSources` etc.) |
| `applicationVersion`  | string     | Application version                                                                     |
| `applicationName`     | string     | Human readable application name                                                         |
| `pathname`            | string     | `pathname` URL part of the application, e.g. `/endpoint/application/run/your-vendor/your-app-id`|

### loadApplicationProperties()
 Returns a `Promise` that resolves with application properties. `Promise` resolution handler is called with the object that represents the properties of the application with the `applicationId` argument.

```javascript
loadApplicationProperties(applicationId).then(({pathname, applicationId}) => {
    console.log(pathname);
    console.log(applicationId)
})
```

`applicationId` is the string identifier of any deployed application.

#### appProperties properties
| Name                | Type       | Comment                                     |
|---------------------|------------|---------------------------------------------|
| `pathname`          | string     | `pathname` URL part of the application, e.g. `/endpoint/application/run/your-vendor/your-app-id` |
| `applicationId`     | string     | Application identifier |

### invokeMethod()
 Invoke a Java method from an application's class. Returns a `Promise` that is resolved with
 serialized/deserialized value that method returns or rejected with the Error object in case
 of any failure.
 
 This method could be used **only when application is fully loaded**.
 
```javascript
import {loadApplication, invokeMethod} from '@genestack/system-api';

loadApplication().then(() => {
    invokeMethod(options).then((result) => {
        console.log(result); // whatever your server method returns
    })
})
```
#### Method invocation options

| Parameter           | Required  | Type             | Default | Comment                                          |
|---------------------|-----------|------------------|---------|--------------------------------------------------|
| `applicationId `    | **✓**     | string           |         | Id of application in format `"vendor/application"` |
| `method`            | **✓**     | string           |         | Application method name                          |
| `parameters`        | **✓**     | Array<JSONValue> |         | A list of parameters that method accepts. Each parameter should be JSON serializable|
| `showBusyIndicator` |           | boolean          | false   | Whether a global busy indicator should be shown  |
| `extendSession`     |           | boolean          | true    | If true, this method call will extend current  user session  |
| `handler`           |           | Function         |         | Success handler. Called with method's returned value, the same as the Promise resolution value |
| `errorHandler`      |           | Function         |         | Error handler. The same as the Promise rejection value|

### showNotification()
 Shows the system notification notification (at the top of the application page)
 Returns a `Promise`.

```javascript
import {showNotification} from '@genestack/system-api';

showNotification('Hello, World!', 'success');
```
#### Method invocation options

| Parameter          | Required | Type       | default   | Comment                              |
|--------------------|----------|------------|-----------|--------------------------------------|
| `message`          | **✓**    | string     |           | Text message                         |
| `type`             |          | string     | `warning` | One of `success`, `warning`, `error` |
