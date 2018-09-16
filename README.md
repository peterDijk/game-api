# Homework assignment Codaisseur week6

## GAME API

### Sunday branch

## API Documentation:
 * run docker postgresql on `postgresql://postgres:secret@localhost:5432/postgres` or provide different credentials in environment variable `DATABASE_URL`
 * yarn install
 * yarn start (listening on port 4000, or provide through environment variable `PORT`)
 
 * ENDPOINTS
   * GET /games -> provides stored games
   * POST /games name=`"Choose a name"` (min 5 characters)

* To play the game, update /games/yourGameId and provide a JSON object in body parameter 'json' with a property "board" - in this a 3x3 board in JSON notation is expected:
   * `PUT /games/yourGameId json:='{ "board": [["o","x","o"],["x","x","o"],["x","x","x"]] }'`

* You can change the color of your game to any of these color-strings: `'red', 'blue', 'green', 'yellow', 'magenta'`
  * `PUT /games/yourGameId json:='{ "color" : "green" }'`

* Change the name of the game in the same mannier:
  * `PUT /games/yourGameId json:='{ "name" : "new name" }'`

Enjoy!