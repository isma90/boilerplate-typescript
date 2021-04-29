

# Boilerplate Typescript

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

### Author

**Ismael Leiva**

* [github/isma90](https://github.com/isma90)
* [dockerhub/ismaleiva90](https://hub.docker.com/u/ismaleiva90)
* [stackoverflow/isma90](https://stackoverflow.com/users/2043313/isma90?tab=profile)

### License

Copyright © 2017, [Ismael Leiva](https://github.com/isma90).
Released under the [MIT License](LICENSE).
