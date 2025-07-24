import { MiddlewareCallback, NextCallback, Request } from "../../src/routes/router"
import { PostRequest } from "../requests/post-request"
import { PostResponse } from "../responses/post-response"

export const middleware1: MiddlewareCallback<PostRequest, PostResponse> = async (
    request: Request<PostRequest>,
    next: NextCallback<PostRequest, PostResponse>
): Promise<PostRequest | undefined> => {
    console.log(middleware1.name)
    return await next(request)
}
