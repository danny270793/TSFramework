import { Request } from './request'
export type RouteCallback = (request: Request<any>) => Promise<any>

export interface VerbRoutes {
    [key: string]: RouteCallback
}
export interface Routes {
    GET: VerbRoutes
    POST: VerbRoutes
    DELETE: VerbRoutes
    PUT: VerbRoutes
}

export const routes: Routes = {
    GET: {},
    POST: {},
    DELETE: {},
    PUT: {},
}

export class SubRouter {
    prefix: string
    constructor(prefix: string) {
        this.prefix = prefix
    }
    async get(path: string, callback: RouteCallback): Promise<void> {
        routes.GET[`${this.prefix}${path}`] = callback
    }
    async post(path: string, callback: RouteCallback): Promise<void> {
        routes.POST[`${this.prefix}${path}`] = callback
    }
    async put(path: string, callback: RouteCallback): Promise<void> {
        routes.PUT[`${this.prefix}${path}`] = callback
    }
    async delete(path: string, callback: RouteCallback): Promise<void> {
        routes.DELETE[`${this.prefix}${path}`] = callback
    }
}

type RouterFunction = (router: SubRouter) => void

export class Router {
    static group(path: string, callback: RouterFunction): void {
        const router: SubRouter = new SubRouter(path)
        callback(router)
    }
    static async get(path: string, callback: RouteCallback): Promise<void> {
        routes.GET[path] = callback
    }
    static async post(path: string, callback: RouteCallback): Promise<void> {
        routes.POST[path] = callback
    }
    static async put(path: string, callback: RouteCallback): Promise<void> {
        routes.PUT[path] = callback
    }
    static async delete(path: string, callback: RouteCallback): Promise<void> {
        routes.DELETE[path] = callback
    }
}
