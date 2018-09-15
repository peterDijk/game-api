import {JsonController, Get, Post, HttpCode, Body, Param, Put, NotFoundError, BadRequestError, BodyParam} from 'routing-controllers'
import Game from './entity'
import {validate} from 'class-validator'

const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

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
    @Body() update: Partial<Game> 
  ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game') 
    
    if (update.id) {
      throw new BadRequestError(`You can't change the id...`)
    }

    if (update.board) {
      const currentBoardParsed = JSON.parse(JSON.stringify(game.board))
      const updateBoardParsed = JSON.parse(update.board)
      console.log(`LENGTH: ${updateBoardParsed.length}`)

      console.log(`diff: ${moves(currentBoardParsed, updateBoardParsed)}`)
      if (moves(currentBoardParsed, updateBoardParsed) > 1) {
        throw new BadRequestError('You can make only 1 move at the time!')
      }


      update.board = updateBoardParsed
    }

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