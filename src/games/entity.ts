import {Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import {BaseEntity} from 'typeorm/repository/BaseEntity'
import { IsString, } from 'class-validator'

const colors: string[] = ['red', 'blue', 'green', 'yellow', 'magenta'];
function randomNumber() {
  return Math.floor(Math.random() * 5)
}

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?:number

  @IsString()
  @Column('text', {nullable: false})
  name: string


  @IsString()
  @Column('text', {nullable: false})
  color: string = colors[randomNumber()]

  @Column('json', {nullable: true})
  board: JSON

}