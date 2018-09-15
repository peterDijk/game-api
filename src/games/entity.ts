import {Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import {BaseEntity} from 'typeorm/repository/BaseEntity'
import { IsString, MinLength } from 'class-validator'

const colors: string[] = ['red', 'blue', 'green', 'yellow', 'magenta']

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?:number

  @IsString()
  @MinLength(5)
  @Column('text', {nullable: false})
  name: string

  // @IsIn(colors)
  @IsString()
  @Column('text', {nullable: false})
  color: string = colors[Math.floor(Math.random() * 5)]

  @Column('json', {nullable: false})
  board: JSON = JSON.parse(JSON.stringify([
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
  ]))

}