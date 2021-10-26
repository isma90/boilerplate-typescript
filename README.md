

# Boilerplate Typescript

Archetype for creating microservices based on Typescript, Express, Winston Logger and Docker
to be deployed in any container manager like Kubernetes (you need to provide that configuration).

### Importante

This archetype uses the [Common-class](https://www.npmjs.com/package/common-clases) library which abstracts to some extent the
configuration of the controllers, roters and that also has a utility class to validate schemas
API input (reference in annex at the end of the readme).

## Quick Start

Get started developing...

```shell
# install deps
yarn install

# run in development mode
yarn dev

# run tests
yarn test
```

---

## How do I modify the example API and make it my own?

There are two key files:
1. `server/routes.ts` - This references the implementation of all of your routes. Add as many routes as you like and point each route your express handler functions.

## Install Dependencies

Install all package dependencies (one time operation)

```shell
yarn install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
yarn dev
```

or debug it

```shell
yarn dev:debug
```

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
yarn compile
yarn prod
```

## Test It

Run the Mocha unit tests

```shell
yarn test
```

or debug them

```shell
yarn test:debug
```
Get Covergate report
````shell
yarn test-coverage
````

## Try It
* Open your browser to [http://localhost:8085](http://localhost:8080)
* Invoke the `/service` endpoint 
  ```shell
  curl http://localhost:8085/service/v1/health
  ```

## Debug It
#### Debug the server:
```
yarn dev:debug
```
#### Debug Tests
```
yarn test:debug
```
# Anexo uso de librería Common clases

## Descripción
Creates an abstraction layer for the Routers and Controllers, also adds a standard response interface that is not
mandatory to use it.

## Uso

First install using `yarn add common-clases`

### Router

Import dependency `import { Router } from 'common-clases';`

Then extend our class from Router

```typescript
export class MyClassRouter extends Router {
}
```

Now in the constructor of our class we have to pass to the super the controller that will handle the endpoints that
let's add.

```typescript
 super(myController);
```
After this we can add the routes we need.

```typescript
    this.router.get("/some-path", this.handler(this.Controller.myFunction));
    this.router.post("/some-path-s", this.handler(this.Controller.myFunctions));
```

The complete example would be as follows:

````typescript
import { Router } from 'common-clases';

export class MyClassRouter extends Router {

    constructor() {
        super(myController);
        this.router.get("/some-path", this.handler(this.Controller.myFunction));
        this.router.post("/some-path-s", this.handler(this.Controller.myFunctions));
    }
}
````
Schema validation

Schemas must be created using Joi to do so, import the validation function and add it to the list of middleware, passing it the schema to validate.
````typescript
import { schemaValidator } from 'common-clases';
import { requestSchema } from './schemas';

...
this.router.get("/some-path", [schemaValidator(requestSchema)], this.handler(this.Controller.myFunction));


````

### Controller

Import dependency `import {Controller} from "common-clases";`

Then extend our controller class from Controller.

```typescript
export class MyController extends Controller {
    
}
```
The constructor must receive request and response (express interfaces) and pass them to the super.
````typescript
    constructor(req: Request, res: Response) {
        super(req, res);
    }
````
Then in the functions you can get data from the request or add to the response using this.

````typescript
    public myFunction() {
        const body = this.req.body;
        return this.res.json({}).send();
    }
````

If you want to use the default interface, you only need to return:
```typescript
    return this.response({payload: {some: ""}});
```
This returns a JSON with the following structure:
```json
{
  "status": {
    "code": number,
    "techCode": string,
    "description": string
  },
  "payload": any,
}
```
The complete example would be as follows:
```typescript
import {Controller} from "common-clases";
import {Request, Response} from "express";

export class MyController extends Controller {
    
    constructor(req: Request, res: Response) {
        super(req, res);
    }

    public myFunction() {
        const body = this.req.body;
        return this.res.json({}).send();
    }
}
```
