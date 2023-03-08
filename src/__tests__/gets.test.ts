import Axios, { AxiosResponse } from 'axios'
import { Request } from '..'
import { randomDictionary, port } from './index.test'

describe('test get requests', () => {
    test.each([
        randomDictionary(Math.random() * 10),
        randomDictionary(Math.random() * 10),
        randomDictionary(Math.random() * 10),
    ])(
        'check if parses query arguments',
        async (dictionary: { [key: string]: string }) => {
            const urlSearchParams: URLSearchParams = new URLSearchParams(
                dictionary
            )
            /* eslint-disable @typescript-eslint/no-explicit-any */
            const response: AxiosResponse<Request<any>> = await Axios({
                method: 'get',
                url: `http://127.0.0.1:${port}/api/users?${urlSearchParams.toString()}`,
            })
            expect(response.data.method).toBe('GET')
            expect(response.data.url).toBe('/api/users')
            expect(response.data.parameters).toStrictEqual({})
            expect(response.data.query).toStrictEqual(dictionary)
            expect(response.data.body).toStrictEqual({})
        }
    )
    test.each([Math.random(), Math.random(), Math.random()])(
        'check if parses url arguments',
        async () => {
            const random: number = Math.random()
            const response: AxiosResponse<Request<any>> = await Axios({
                method: 'get',
                url: `http://127.0.0.1:${port}/api/users/${random}`,
            })
            expect(response.data.method).toBe('GET')
            expect(response.data.url).toBe(`/api/users/${random}`)
            expect(response.data.parameters).toStrictEqual({ id: `${random}` })
            expect(response.data.query).toStrictEqual({})
            expect(response.data.body).toStrictEqual({})
        }
    )
    test.each([
        randomDictionary(Math.random() * 10),
        randomDictionary(Math.random() * 10),
        randomDictionary(Math.random() * 10),
    ])(
        'check if parses query and url arguments',
        async (dictionary: { [key: string]: string }) => {
            const random: string = `${Math.random()}`
            const urlSearchParams: URLSearchParams = new URLSearchParams(
                dictionary
            )
            /* eslint-disable @typescript-eslint/no-explicit-any */
            const response: AxiosResponse<Request<any>> = await Axios({
                method: 'get',
                url: `http://127.0.0.1:${port}/api/users/${random}?${urlSearchParams.toString()}`,
            })
            expect(response.data.method).toBe('GET')
            expect(response.data.url).toBe(`/api/users/${random}`)
            expect(response.data.parameters).toStrictEqual({ id: random })
            expect(response.data.query).toStrictEqual(dictionary)
            expect(response.data.body).toStrictEqual({})
        }
    )
    test.each([
        [Math.random(), Math.random()],
        [Math.random(), Math.random()],
        [Math.random(), Math.random()],
    ])(
        'check if parses multiple url arguments',
        async (random1: number, random2: number) => {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            const response: AxiosResponse<Request<any>> = await Axios({
                method: 'get',
                url: `http://127.0.0.1:${port}/api/users/${random1}/location/${random2}`,
            })
            expect(response.data.method).toBe('GET')
            expect(response.data.url).toBe(
                `/api/users/${random1}/location/${random2}`
            )
            expect(response.data.parameters).toStrictEqual({
                user_id: `${random1}`,
                location_id: `${random2}`,
            })
            expect(response.data.query).toStrictEqual({})
            expect(response.data.body).toStrictEqual({})
        }
    )
})
