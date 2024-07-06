import Http, { IncomingHttpHeaders } from 'http'
import Url, { UrlWithParsedQuery } from 'url'
import { ParsedUrlQuery } from 'querystring'
import { VerbRoutes, routes } from './router'
import { Request } from './request'

export abstract class Server  {
    static parseHeaders(incomingHttpHeaders: IncomingHttpHeaders): {
        [key: string]: string
    } {
        const headers: { [key: string]: string } = {}
        Object.keys(incomingHttpHeaders).map(
            (key) => (headers[key] = `${incomingHttpHeaders[key]}`)
        )
        return headers
    }

    static urlToRegexp(url: string): RegExp {
        return new RegExp(`^${url.replace(/:\w+/g, '([^/]+)')}$`)
    }

    static parseParameters(
        urlAvailable: string,
        urlRequested: string
    ): { [key: string]: string } {
        const regExp: RegExp = Server.urlToRegexp(urlAvailable)
        const urlRequestedMatches: RegExpMatchArray | null =
            urlRequested.match(regExp)
        const urlAvailableMatches: RegExpMatchArray | null =
            urlAvailable.match(regExp)

        if (urlRequestedMatches === null || urlAvailableMatches === null) {
            return {}
        }

        const paramenters: { [key: string]: string } = {}
        for (
            let index: number = 0;
            index < urlRequestedMatches.length;
            index++
        ) {
            if (index === 0) {
                continue
            }
            const key: string = urlAvailableMatches[index].slice(1)
            const value: string = urlRequestedMatches[index]
            paramenters[key] = value
        }
        return paramenters
    }

    static parseQuery(parsedUrlQuery: ParsedUrlQuery): { [key: string]: string } {
        const query: { [key: string]: string } = {}
        Object.keys(parsedUrlQuery).map(
            (key) => (query[key] = `${parsedUrlQuery[key]}`)
        )
        return query
    }

    static parseBody(request: Http.IncomingMessage): Promise<any> {
        return new Promise<string>((resolve, reject) => {
            const bodyParts: any = []
            request.on('data', (chunk: any) => bodyParts.push(chunk))
            request.on('end', () => {
                const body: string = Buffer.concat(bodyParts).toString()
                try {
                    resolve(body === '' ? {} : JSON.parse(body))
                } catch (error) {
                    reject(error)
                }
            })
        })
    }

    static on(port: number) {
        console.log(`listening http://127.0.0.1:${port}`)

        const httpServer: Http.Server = Http.createServer(
            async (request: Http.IncomingMessage, response: Http.ServerResponse) => {
                try {
                    const url: string | undefined = request.url
                    if (url === undefined) {
                        console.error('url of the request not defined')
                        response.writeHead(400)
                        response.end()
                        return
                    }
                    
                    const method: string | undefined = request.method
                    if (method === undefined) {
                        console.error('method of the request not defined')
                        response.writeHead(400)
                        response.end()
                        return
                    }

                    const endpoints: VerbRoutes = method === 'GET' ? routes.GET : method === 'POST' ? routes.POST : method === 'PUT' ? routes.PUT : method === 'DELETE' ? routes.DELETE : {}
                    if (Object.keys(endpoints).length === 0) {
                        console.error(`invalid http method "${method}"`)
                        response.writeHead(405)
                        response.end()
                        return
                    }

                    const urlWithParsedQuery: UrlWithParsedQuery = Url.parse(
                        url,
                        true
                    )
                    if (urlWithParsedQuery.pathname === null) {
                        throw new Error('invalid pathname in the url parsed')
                    }
                    const pathname: string = urlWithParsedQuery.pathname.endsWith('/') ? urlWithParsedQuery.pathname.slice(0, -1): urlWithParsedQuery.pathname

                    const keys: string[] = Object.keys(endpoints).filter((endpoint) => {
                        if(endpoint.endsWith('/')) {
                            endpoint = endpoint.slice(0, -1)
                        }
                        const available: string = endpoint
                        const regexp: string = `^${available.replace(/:\w+/g, '([^/]+)')}$`
                        const matches: RegExpMatchArray | null = pathname.match(regexp)
                        return matches !== null
                    })
                    if (keys.length !== 1) {
                        console.error(`not found endpoint to url "${pathname}"`)
                        response.writeHead(404)
                        response.end()
                        return
                    }

                    const key: string = keys[0]
                    const frameworkRequest: Request<any> = {
                        method: method,
                        url: pathname,
                        parameters: Server.parseParameters(`${key}`, pathname),
                        headers: Server.parseHeaders(request.headers),
                        query: Server.parseQuery(urlWithParsedQuery.query),
                        body: await Server.parseBody(request),
                    }

                    const result: any = await endpoints[key](frameworkRequest)
                    response.setHeader('Content-Type', 'application/json')
                    response.write(JSON.stringify(result, null, 4))
                    response.end()
                } catch (error) {
                    console.error(error)
                    response.writeHead(500)
                    response.end()
                }
            }
        )
        
        httpServer.listen(port)
    }
}
