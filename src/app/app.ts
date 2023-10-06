import Http, { Server } from 'http'
import { Router } from '../routes/router'

/**
 * App that andle routers and runs the server
 */
export class TSFramework {
    /**
     * native node http server instance
     */
    private server: Server | undefined
    /**
     * array of available routers
     */
    private routers: { [prefix: string]: Router } = {}
    /**
     * Set router to specific prefix
     *
     * @param prefix prefix to add to each router
     * @param router router that contains all callbacks
     */
    set(prefix: string, router: Router) {
        this.routers[prefix] = router
    }
    /**
     * Listen to specific port and dispatch to especific callback
     *
     * @param port port where listen http connections
     */
    run(port: number) {
        if (this.server !== undefined) {
            throw new Error('server is already running')
        }

        this.server = Http.createServer(
            async (request: Http.IncomingMessage, response: Http.ServerResponse) => {
                const url: string | undefined = request.url
                if (url === undefined) {
                    console.error('url of the request not defined')
                    response.writeHead(400)
                    response.end()
                    return
                }

                const routerKeys: string[] = Object.keys(this.routers).filter(
                    (key: string) => url.startsWith(key)
                )
                if (routerKeys.length !== 1) {
                    console.error(`not found router for url "${url}"`)
                    response.writeHead(404)
                    response.end()
                    return
                }

                try {
                    const routerKey: string = routerKeys[0]
                    await this.routers[routerKey].enroute(
                        routerKey,
                        request,
                        response
                    )
                } catch (error) {
                    console.error(error)
                    response.writeHead(500)
                    response.end()
                }
            }
        ).listen(port)
    }
    /**
     * Stop listening to specific port
     */
    stop() {
        if (this.server === undefined) {
            throw new Error('server already stoped')
        }

        this.server.close()
        this.server = undefined
    }
}
