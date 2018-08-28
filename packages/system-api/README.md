# Genestack system APIs to use in browser

## Installation
```
npm install @genestack/system-api
```

## Content
### invokeMethod
 Invoke a Java method from an application's class. Returns a Promise that is resolved with 
 serialized/deserialized value that method returns or rejected wiht the Error object in case
 of any failure.
 
```typescript
function invokeMethod(options: MethodInvocationOptions): Promise<any>
```
#### Method invocation options

| Parameter           | Type             | Default | Comment                                          |
|---------------------|------------------|---------|--------------------------------------------------|
| `applicationId `    | string           |         | Id of application in format `"vendor/application"` |
| `method`            | string           |         | Application method name                          |
| `parameters`        | Array<JSONValue> |         | A list of parameters that method accepts. Each parameter should be JSON serializable|
| `showBusyIndicator` | boolean          | false   | Whether a global busy indicator should be shown  |
| `extendSession`     | boolean          | true    | If true, this method call will extend current  user session  |
| `handler`           | Function         |         | Success handler. Called with method's returned value, the same as the Promise resolution value |
| `errorHandler`      | Function         |         | Error handler. The same as the Promise rejection value|
