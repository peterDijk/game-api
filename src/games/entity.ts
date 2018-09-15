import {Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import {BaseEntity} from 'typeorm/repository/BaseEntity'
import { IsString, } from 'class-validator'

// 


@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?:number

  @IsString()
  @Column('text', {nullable: false})
  name: string


  @IsString()
  @Column('text', {nullable: true})
  color: string

  @Column('json', {nullable: true})
  board: JSON

  setColor() {
    const colors: string[] = ['red', 'blue', 'green', 'yellow', 'magenta']
    this.color = colors[Math.floor(Math.random() * 5)]
  }

}