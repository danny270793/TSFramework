import { TSFramework } from './app/app'
import { Request, Router } from './routes/router'

async function middleware1 (request: Request<any>): Promise<[Request<any>, any]> {
    console.log(middleware1.name)
    return [request, null]
}

async function middleware2 (request: Request<any>): Promise<[Request<any>, any]> {
    console.log(middleware2.name)
    return [request, {date: new Date()}]
}

async function middleware3 (request: Request<any>): Promise<[Request<any>, any]> {
    console.log(middleware3.name)
    return [request, null]
}

const apiRouter: Router = new Router()
apiRouter.get(
    '/users/:user_id/location/:location_id',
    [middleware1, middleware2, middleware3],
    async (request: Request<any>): Promise<Request<any>> => {
        console.log('get')
        return request
    }
)
apiRouter.post(
    '/users/:user_id/location/:location_id',
    [middleware1, middleware2, middleware3],
    async (request: Request<any>): Promise<Request<any>> => {
        console.log('post')
        return request
    }
)

const port: number = 8000
const app: TSFramework = new TSFramework()
app.set('/api', apiRouter)
app.run(port)
