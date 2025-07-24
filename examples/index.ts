import { TSFramework } from '../src/app/app'
import { apiRouter } from './routers/api'

const port: number = 8000
const app: TSFramework = new TSFramework()
app.set('/api', apiRouter)
app.run(port)
