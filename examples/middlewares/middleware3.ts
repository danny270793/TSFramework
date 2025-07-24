import { MiddlewareCallback, NextCallback, Request } from "../../src/routes/router"
import { GetRequest } from "../requests/get-request"
import { PostRequest } from "../requests/post-request"
import { GetResponse } from "../responses/get-response"

export const middleware3: MiddlewareCallback<GetRequest, GetResponse> = async (
    request: Request<GetRequest>,
    next: NextCallback<GetRequest, GetResponse>
): Promise<PostRequest | undefined> => {
    console.log(middleware3.name)
    return await next(request)
}