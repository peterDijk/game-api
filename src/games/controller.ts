import {JsonController, Get, Post, HttpCode, Param, Put, NotFoundError, BadRequestError, BodyParam} from 'routing-controllers'
import Game from './entity'
import {validate} from 'class-validator'
import {moves} from '../lib/gameInput'

@JsonController()
export default class GameController {

  @Get('/games')
  async getAllGames() {
    const games = await Game.find()
    return { games }
  }

  @Get('/games/:id')
  async getOneGame(
    @Param('id') id: number
  ) {
    const game = await Game.findOne(id)
    return game
  }

  @Post('/games')
  @HttpCode(201)
  async createGame(
    @BodyParam("name") name: string
  ) {
    const newGame = await Game.create({name})
    return newGame.save()
  }

  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @BodyParam('json') json: Partial<Game>
  ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')
    
    if (json.id) {
      throw new BadRequestError(`You can't change the id...`)
    }

    if (json.board) {

        if (json.board.filter(row => row.length === 3).length !== 3 || json.board.length !== 3) {
          throw new BadRequestError(`That's not a valid 3x3 board`)
        }
        if (moves(game.board, json.board) > 1) {
          throw new BadRequestError('You can make only 1 move at the time!')
        }
        if (moves(game.board, json.board) === 0) {
          throw new BadRequestError(`You didn't make a move`)
        }
    }

    const merged = await Game.merge(game, json)

    const errors = await validate(merged)
    if (errors.length > 0) {
        throw new BadRequestError(`Validation failed! Reason: ${errors[0]}`)
    } else {
      return merged.save()
    }
  }
}