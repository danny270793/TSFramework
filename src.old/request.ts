export interface Request<T> {
    method: string
    url: string
    parameters: { [key: string]: string }
    query: { [key: string]: string }
    headers: { [key: string]: string }
    body: T
}
