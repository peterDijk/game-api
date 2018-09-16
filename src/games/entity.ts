import {Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import {BaseEntity} from 'typeorm/repository/BaseEntity'
import { IsString, MinLength, IsIn } from 'class-validator'
import {colors, freshBoard} from '../lib/gameInput'

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?:number

  @IsString()
  @MinLength(5) // to check if validators keep working
  @Column('text', {nullable: false})
  name: string

  @IsIn(colors)
  @IsString()
  @Column('text', {nullable: false})
  color: string = colors[Math.floor(Math.random() * colors.length)]
  
  @Column('json', {nullable: false})
  board: string[][] = JSON.parse(JSON.stringify(freshBoard)) 

}