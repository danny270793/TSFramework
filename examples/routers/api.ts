import { Request, Router } from "../../src/routes/router"
import { middleware1 } from "../middlewares/middleware1"
import { middleware2 } from "../middlewares/middleware2"
import { middleware3 } from "../middlewares/middleware3"
import { GetRequest } from "../requests/get-request"
import { PostRequest } from "../requests/post-request"

export const apiRouter: Router = new Router()

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