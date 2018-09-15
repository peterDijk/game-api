import 'reflect-metadata'
import {createKoaServer} from 'routing-controllers'
import setupDb from './db'
import GameController from './games/controller'

const port = process.env.PORT || 4000

const app = createKoaServer({
  controllers: [
    GameController
    ]
})

app.listen(port, () => console.log(`Listening on port ${port}`))
export let dbUp = false
setupDb()
  .then(_ => dbUp = true)
  .catch(err => console.error(err))