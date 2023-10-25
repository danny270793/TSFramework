import { TSFramework } from '../src/app/app'
import {
    Request,
    Router,
    MiddlewareCallback,
    NextCallback,
} from '../src/routes/router'

interface PostRequest {}

interface PostResponse {}

const middleware1: MiddlewareCallback<PostRequest, PostResponse> = async (
    request: Request<PostRequest>,
    next: NextCallback<PostRequest, PostResponse>
): Promise<PostRequest | undefined> => {
    console.log(middleware1.name)
    return await next(request)
}

const middleware2: MiddlewareCallback<PostRequest, PostResponse> = async (
    request: Request<PostRequest>,
    next: NextCallback<PostRequest, PostResponse>
): Promise<PostRequest | undefined> => {
    console.log(middleware2.name)
    return await next(request)
}

interface GetRequest {}

interface GetResponse {}

const middleware3: MiddlewareCallback<GetRequest, GetResponse> = async (
    request: Request<GetRequest>,
    next: NextCallback<GetRequest, GetResponse>
): Promise<PostRequest | undefined> => {
    console.log(middleware3.name)
    return await next(request)
}

const apiRouter: Router = new Router()
apiRouter.get(
    '/users/:user_id/location/:location_id',
    [middleware3],
    async (request: Request<GetRequest>): Promise<Request<GetRequest>> => {
        console.log('get')
        return request
    }
)
apiRouter.post(
    '/users/:user_id/location/:location_id',
    [middleware1, middleware2],
    async (request: Request<PostRequest>): Promise<Request<PostRequest>> => {
        console.log('post')
        return request
    }
)

const port: number = 8000
const app: TSFramework = new TSFramework()
app.set('/api', apiRouter)
app.run(port)
