# TSFramework

[![Github pipeline status](https://github.com/danny270793/TSFramework/actions/workflows/releaser.yaml/badge.svg)](https://github.com/danny270793/TSFramework/actions/workflows/release.yaml)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/danny270793/TSFramework)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/danny270793/TSFramework/total)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/danny270793/TSFramework)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/%40danny270793/tsframework)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40danny270793%2Ftsframework)
![GitHub repo size](https://img.shields.io/github/repo-size/danny270793/tsframework)
[![install size](https://packagephobia.com/badge?p=@danny270793/tsframework)](https://packagephobia.com/result?p=@danny270793/tsframework)
![NPM Downloads](https://img.shields.io/npm/dy/%40danny270793%2Ftsframework)
![NPM Type Definitions](https://img.shields.io/npm/types/%40danny270793%2Ftsframework)


TSFramework is typescript microframework for an educational porposes

## Instalation

Install package from public registry

```bash
npm install @danny270793/tsframework
```

## Example

Import the library

```ts
import { TSFramework, Router, Request } from '@danny270793/tsframework'
```

Create how many routers you need

```ts
const apiRouter: Router = new Router()
```

Register a callback for the path `/users/:user_id/location/:location_id` just for `get` requests<br>
Notice that the callback must return something, the framework serializes that return to json automatically before sent it back to the client

```ts
apiRouter.get(
    '/users/:user_id/location/:location_id',
    async (request: Request<any>): Promise<Request<any>> => {
        return request
    }
)
```

Create a `TSFramework` instance and `set` it the router with a prefix, then run the web server in an specific port

```ts
const port: number = 8000
const app: TSFramework = new TSFramework()
app.set('/api', apiRouter)
app.run(port)
```

Test the library

```bash
curl -X GET http://127.0.0.1:8000//users/25/location/35?key1=value1&key2=value2
```

## Follow me

[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://www.youtube.com/channel/UC5MAQWU2s2VESTXaUo-ysgg)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://www.github.com/danny270793/)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danny270793)

## LICENSE

[![GitHub License](https://img.shields.io/github/license/danny270793/TSFramework)](license.md)

## Version

![GitHub Tag](https://img.shields.io/github/v/tag/danny270793/TSFramework)
![GitHub Release](https://img.shields.io/github/v/release/danny270793/tsframework)
![GitHub package.json version](https://img.shields.io/github/package-json/v/danny270793/tsframework)
![NPM Version](https://img.shields.io/npm/v/%40danny270793%2Ftsframework)

Last update 09/03/2023
