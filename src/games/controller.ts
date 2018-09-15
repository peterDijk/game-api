import {JsonController, Get, Post, HttpCode, Body, Param, Put, NotFoundError, BadRequestError} from 'routing-controllers'
import Game from './entity'
import {validate} from 'class-validator'

@JsonController()
export default class GameController {

  @Get('/games')
  async getAllGames() {
    const games = await Game.find()
    return { games }
  }

  @Get('/games/:id')
  getOneGame(
    @Param('id') id: number
  ) {
    return Game.findOne(id)
  }

  @Post('/games')
  @HttpCode(201)
  async createGame(
    @Body() game: Game
  ) {
    return game.save()
  }

  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() update: Partial<Game> 
  ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game') 

    const merged = await Game.merge(game, update)

    const errors = await validate(merged)
    if (errors.length > 0) {
      console.log(errors)
        throw new BadRequestError(`Validation failed! Reason: ${errors[0]}`)
    } else {
      return merged.save()
    }
    
  }
}