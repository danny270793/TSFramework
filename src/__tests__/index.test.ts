import Axios, { AxiosResponse, AxiosError } from 'axios'
import { TSFramework, Router, Request } from '..'

export function randomDictionary(quantity: number): { [key: string]: string } {
    const dictionary: { [key: string]: string } = {}
    for (let index: number = 0; index < quantity; index++) {
        dictionary[`key${index}`] = `${Math.random()}`
    }
    return dictionary
}

function createApp(): TSFramework {
    const apiRouter: Router = new Router()
    apiRouter.get(
        '/users',
        [],
        /* eslint-disable @typescript-eslint/no-explicit-any */
        async (request: Request<any>): Promise<Request<any>> => {
            return request
        }
    )
    apiRouter.get(
        '/users/:id',
        [],
        /* eslint-disable @typescript-eslint/no-explicit-any */
        async (request: Request<any>): Promise<Request<any>> => {
            return request
        }
    )
    apiRouter.get(
        '/users/:user_id/location/:location_id',
        [],
        /* eslint-disable @typescript-eslint/no-explicit-any */
        async (request: Request<any>): Promise<Request<any>> => {
            return request
        }
    )

    apiRouter.post(
        '/users',
        [],
        /* eslint-disable @typescript-eslint/no-explicit-any */
        async (request: Request<any>): Promise<Request<any>> => {
            return request
        }
    )
    apiRouter.post(
        '/users/:id',
        [],
        /* eslint-disable @typescript-eslint/no-explicit-any */
        async (request: Request<any>): Promise<Request<any>> => {
            return request
        }
    )
    apiRouter.post(
        '/users/:user_id/location/:location_id',
        [],
        /* eslint-disable @typescript-eslint/no-explicit-any */
        async (request: Request<any>): Promise<Request<any>> => {
            return request
        }
    )

    const app: TSFramework = new TSFramework()
    app.set('/api', apiRouter)

    return app
}

export const port: number = 8000
const app: TSFramework = createApp()

beforeAll(() => {
    app.run(port)
})

afterAll(() => {
    app.stop()
})

describe('check base of web server', () => {
    test('url should exists', async () => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const response: AxiosResponse<Request<any>> = await Axios({
            method: 'get',
            url: `http://127.0.0.1:${port}/api/users`,
        })
        expect(response.status).toBe(200)
    })
    test('url should not exists', async () => {
        Axios({
            method: 'get',
            url: `http://127.0.0.1:${port}/api/non-users`,
        }).catch((error: AxiosError) => {
            if (error.response === undefined) {
                throw new Error('missing response')
            }
            expect(error.response.status).toBe(404)
        })
    })
    test('method should not exists', async () => {
        Axios({
            method: 'delete',
            url: `http://127.0.0.1:${port}/api/users`,
        }).catch((error: AxiosError) => {
            if (error.response === undefined) {
                throw new Error('missing response')
            }
            expect(error.response.status).toBe(405)
        })
    })
    test('parse invalid requests', async () => {
        Axios({
            method: 'non-existing-method',
            url: `http://127.0.0.1:${port}/api/users`,
        }).catch((error: AxiosError) => {
            if (error.response === undefined) {
                throw new Error('missing response')
            }
            expect(error.response.status).toBe(400)
        })
    })
})
