import {JsonController, Get, Post, HttpCode, Body} from 'routing-controllers'
import Game from './entity'


@JsonController()
export default class GameController {

  @Get('/games')
  async getAllGames() {
    const games = await Game.find()
    return { games }
  }

  @Post('/games')
  @HttpCode(201)
  async createGame(
    @Body() game: Game
  ) {
    const newGame = Game.create(game)
    await newGame.setColor()
    return newGame.save()
  }
}