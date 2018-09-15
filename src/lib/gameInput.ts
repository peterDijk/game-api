export const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

export const colors: string[] = ['red', 'blue', 'green', 'yellow', 'magenta']

export const freshBoard = [
      ['o', 'o', 'o'],
      ['o', 'o', 'o'],
      ['o', 'o', 'o']
    ]