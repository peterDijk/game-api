import {Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import {BaseEntity} from 'typeorm/repository/BaseEntity'
import { IsString, MinLength, IsIn } from 'class-validator'

const colors: string[] = ['red', 'blue', 'green', 'yellow', 'magenta']

const freshBoard = [
  ['o', 'o', 'o'],
  ['o', 'o', 'o'],
  ['o', 'o', 'o']
]


// const moves = (board1, board2) => 
//   board1
//     .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
//     .reduce((a, b) => a.concat(b))
//     .length

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?:number

  @IsString()
  @MinLength(5)
  @Column('text', {nullable: false})
  name: string

  @IsIn(colors)
  @IsString()
  @Column('text', {nullable: false})
  color: string = colors[Math.floor(Math.random() * colors.length)]

  
  @Column('json', {nullable: false})
  board: string[][] = freshBoard // array with in it array of strings

}