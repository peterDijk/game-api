# Homework assignment Codaisseur week6

## GAME API

## API Documentation:
 * run docker postgresql on `postgresql://postgres:secret@localhost:5432/postgres` or provide different credentials in environment variable `DATABASE_URL`
 * yarn install
 * yarn start (listening on port 4000, or provide through environment variable `PORT`)
 
 * ENDPOINTS
   * GET /games -> provides stored games
   * POST /games name=`"Choose a name"`

* To play the game, update /games/yourGameId and provide a 3x3 board in stringified JSON
   * PUT /games/yourGameId board=`"[[\"o\",\"o\",\"o\"],[\"o\",\"o\",\"o\"],[\"o\",\"o\",\"o\"]]"`

* You can change the color of your game to any of these color-strings: `'red', 'blue', 'green', 'yellow', 'magenta'`
  * PUT /games/yourGameId color=`"green"`

Enjoy!