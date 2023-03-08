import Http, { IncomingHttpHeaders } from 'http'
import { ParsedUrlQuery } from 'querystring'
import Url, { UrlWithParsedQuery } from 'url'

/**
 * The http request representation
 */
export interface Request<T> {
    method: string
    url: string
    parameters: { [key: string]: string }
    query: { [key: string]: string }
    headers: { [key: string]: string }
    body: T
}

export type RouterCallback<Req, Res> = (request: Request<Req>) => Promise<Res>

/**
 * Class that handle all http requests and dispatch to specific callback
 */
export class Router {
    /**
     * Dictionary of the callbacks separated by method and prefix
     */
    private endpoints: {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        [method: string]: { [prefix: string]: RouterCallback<any, any> }
    } = {
        GET: {},
        POST: {},
        PUT: {},
        PATCH: {},
        DELETE: {},
    }
    /**
     * Register a callback to specific path for get methods
     *
     * @param path path to register the callback
     * @param callback callback executen when request is received
     */
    get<Req, Res>(path: string, callback: RouterCallback<Req, Res>) {
        this.endpoints['GET'][path] = callback
    }
    /**
     * Register a callback to specific path for post methods
     *
     * @param path path to register the callback
     * @param callback callback executen when request is received
     */
    post<Req, Res>(path: string, callback: RouterCallback<Req, Res>) {
        this.endpoints['POST'][path] = callback
    }
    /**
     * Register a callback to specific path for patch methods
     *
     * @param path path to register the callback
     * @param callback callback executen when request is received
     */
    patch<Req, Res>(path: string, callback: RouterCallback<Req, Res>) {
        this.endpoints['PATCH'][path] = callback
    }
    /**
     * Register a callback to specific path for put methods
     *
     * @param path path to register the callback
     * @param callback callback executen when request is received
     */
    put<Req, Res>(path: string, callback: RouterCallback<Req, Res>) {
        this.endpoints['PUT'][path] = callback
    }
    /**
     * Register a callback to specific path for delete methods
     *
     * @param path path to register the callback
     * @param callback callback executen when request is received
     */
    delete<Req, Res>(path: string, callback: RouterCallback<Req, Res>) {
        this.endpoints['DELETE'][path] = callback
    }

    /**
     * Parses the query as a dictionary
     *
     * @param parsedUrlQuery the query parsed
     * @returns the query as a dictionary
     */
    parseQuery(parsedUrlQuery: ParsedUrlQuery): { [key: string]: string } {
        const query: { [key: string]: string } = {}
        Object.keys(parsedUrlQuery).map(
            (key) => (query[key] = `${parsedUrlQuery[key]}`)
        )
        return query
    }

    /**
     * Parses the headers as a dictionary
     *
     * @param incomingHttpHeaders the headers incoming
     * @returns the headers as a dictionary
     */
    parseHeaders(incomingHttpHeaders: IncomingHttpHeaders): {
        [key: string]: string
    } {
        const headers: { [key: string]: string } = {}
        Object.keys(incomingHttpHeaders).map(
            (key) => (headers[key] = `${incomingHttpHeaders[key]}`)
        )
        return headers
    }

    /**
     * Parses the body as a json
     *
     * @param request the incoming http request
     * @returns the body as a json
     */
    parseBody(request: Http.IncomingMessage): Promise<any> {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        return new Promise<any>((resolve) => {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            const bodyParts: any = []
            request.on('data', (chunk) => bodyParts.push(chunk))
            request.on('end', () => {
                const body: string = Buffer.concat(bodyParts).toString()
                resolve(body === '' ? {} : JSON.parse(body))
            })
        })
    }

    /**
     * Extract the parameters embedded in the url `/url/:parameter`
     *
     * @param urlAvailable template defined in route.<method>('urlAvailable', callback)
     * @param urlRequested url received in http request
     * @returns the url embedded parameters
     */
    parseParameters(
        urlAvailable: string,
        urlRequested: string
    ): { [key: string]: string } {
        const regExp: RegExp = new RegExp(
            `^${urlAvailable.replace(/:\w+/g, '([^/]+)')}$`
        )
        const urlRequestedMatches: RegExpMatchArray | null =
            urlRequested.match(regExp)
        const urlAvailableMatches: RegExpMatchArray | null =
            urlAvailable.match(regExp)

        if (urlRequestedMatches === null || urlAvailableMatches === null) {
            throw new Error('error parsing url paramenters')
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

    /**
     * Execute the callback for the select prefix and request
     *
     * @param endpoints dictionary of callbacks that matches the method
     * @param prefix prefix assigned to the router
     * @param request incomming http request
     * @param response object to send http responses
     * @returns
     */
    execute(
        /* eslint-disable @typescript-eslint/no-explicit-any */
        endpoints: { [prefix: string]: RouterCallback<any, any> },
        prefix: string,
        request: Http.IncomingMessage,
        response: Http.ServerResponse
    ) {
        if (request.url === undefined) {
            throw new Error('missung url in http request')
        }
        if (request.method === undefined) {
            throw new Error('missung method in http request')
        }
        const method: string = request.method

        const urlWithParsedQuery: UrlWithParsedQuery = Url.parse(
            request.url,
            true
        )
        if (urlWithParsedQuery.pathname === null) {
            throw new Error('invalid pathname in the url parsed')
        }
        const pathname: string = urlWithParsedQuery.pathname

        const keys: string[] = Object.keys(endpoints).filter((endpoint) => {
            const available: string = `${prefix}${endpoint}`
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

        this.parseBody(request)
            .then((body: string) => {
                const key: string = keys[0]
                /* eslint-disable @typescript-eslint/no-explicit-any */
                const frameworkRequest: Request<any> = {
                    method: method,
                    url: pathname,
                    parameters: this.parseParameters(
                        `${prefix}${key}`,
                        pathname
                    ),
                    headers: this.parseHeaders(request.headers),
                    query: this.parseQuery(urlWithParsedQuery.query),
                    body,
                }
                /* eslint-disable @typescript-eslint/no-explicit-any */
                endpoints[key](frameworkRequest).then((result: any) => {
                    response.setHeader('Content-Type', 'application/json')
                    response.write(JSON.stringify(result, null, 4))
                    response.end()
                })
            })
            .catch((error) => {
                console.error(`error parsing body`)
                console.error(error)
                response.writeHead(500)
                response.end()
            })
    }

    /**
     * Find the right callback for the prefix and request and execute it
     *
     * @param prefix prefix assigned to the router
     * @param request incomming http request
     * @param response object to send http responses
     * @returns
     */
    enroute(
        prefix: string,
        request: Http.IncomingMessage,
        response: Http.ServerResponse
    ) {
        const method: string | undefined = request.method
        if (method === undefined) {
            console.error('method of the request not defined')
            response.writeHead(500)
            response.end()
            return
        }

        if (Object.keys(this.endpoints[method]).length === 0) {
            console.error(`invalid http method "${method}"`)
            response.writeHead(405)
            response.end()
            return
        }

        this.execute(this.endpoints[method], prefix, request, response)
    }
}
