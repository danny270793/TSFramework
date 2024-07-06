import { Router, SubRouter } from '../src/index'
import UserController from './controllers/users'
import TicketController from './controllers/tickets'

Router.get('/users', UserController.all)
Router.get('/users/:id', UserController.one)
Router.post('/users/:id', UserController.create)
Router.put('/users/:id', UserController.update)
Router.delete('/users/:id', UserController.delete)
Router.group('/tickets', (router: SubRouter) => {
    router.get('/', TicketController.all)
    router.get('/:id', TicketController.one)
    router.post('/:id', TicketController.create)
    router.put('/:id', TicketController.update)
    router.delete('/:id', TicketController.delete)
})
