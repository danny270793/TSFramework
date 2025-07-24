# TSFramework

![NPM Type Definitions](https://img.shields.io/npm/types/%40danny270793%2Ftsframework)

[![install size](https://packagephobia.com/badge?p=@danny270793/tsframework)](https://packagephobia.com/result?p=@danny270793/tsframework)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40danny270793%2Ftsframework)
![GitHub repo size](https://img.shields.io/github/repo-size/danny270793/tsframework)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/danny270793/TSFramework)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/%40danny270793/tsframework)

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/danny270793/TSFramework)
![NPM Downloads](https://img.shields.io/npm/dy/%40danny270793%2Ftsframework)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/danny270793/TSFramework/total)

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
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwLDAsMjU2LDI1NiIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgZmlsbC1ydWxlPSJub256ZXJvIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48ZyB0cmFuc2Zvcm09InNjYWxlKDUuMTIsNS4xMikiPjxwYXRoIGQ9Ik00MSw0aC0zMmMtMi43NiwwIC01LDIuMjQgLTUsNXYzMmMwLDIuNzYgMi4yNCw1IDUsNWgzMmMyLjc2LDAgNSwtMi4yNCA1LC01di0zMmMwLC0yLjc2IC0yLjI0LC01IC01LC01ek0xNywyMHYxOWgtNnYtMTl6TTExLDE0LjQ3YzAsLTEuNCAxLjIsLTIuNDcgMywtMi40N2MxLjgsMCAyLjkzLDEuMDcgMywyLjQ3YzAsMS40IC0xLjEyLDIuNTMgLTMsMi41M2MtMS44LDAgLTMsLTEuMTMgLTMsLTIuNTN6TTM5LDM5aC02YzAsMCAwLC05LjI2IDAsLTEwYzAsLTIgLTEsLTQgLTMuNSwtNC4wNGgtMC4wOGMtMi40MiwwIC0zLjQyLDIuMDYgLTMuNDIsNC4wNGMwLDAuOTEgMCwxMCAwLDEwaC02di0xOWg2djIuNTZjMCwwIDEuOTMsLTIuNTYgNS44MSwtMi41NmMzLjk3LDAgNy4xOSwyLjczIDcuMTksOC4yNnoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==&logoColor=white&style=for-the-badge)](https://www.linkedin.com/in/danny270793)

## LICENSE

[![GitHub License](https://img.shields.io/github/license/danny270793/TSFramework)](license.md)

## Version

![GitHub Tag](https://img.shields.io/github/v/tag/danny270793/TSFramework)
![GitHub Release](https://img.shields.io/github/v/release/danny270793/tsframework)
![GitHub package.json version](https://img.shields.io/github/package-json/v/danny270793/tsframework)
![NPM Version](https://img.shields.io/npm/v/%40danny270793%2Ftsframework)

Last update 09/03/2023
