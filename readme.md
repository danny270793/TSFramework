# TSFramework

TSFramework is typescript microframework for an educational porposes

## Instalation

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

## Follow me

-   [Youtube](https://www.youtube.com/channel/UC5MAQWU2s2VESTXaUo-ysgg)
-   [Github](https://www.github.com/danny270793/)
-   [LinkedIn](https://www.linkedin.com/in/danny270793)

## Version

TSFramework version 1.0.0<br>
Last update 07/03/2023
