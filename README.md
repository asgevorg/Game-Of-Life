# Programming 3 (by asgevorg)

This is code example of Tumos project GameOfLife with server side programming.

## Installation

Use the node package manager [npm](https://www.npmjs.com/) to install project modules.

```bash
npm install
```

It will installs [express.js](https://expressjs.com/) and [socket.io](https://socket.io/)

After that you can run server by typing.

```bash
npm start
```
# About the programm

There is a big matrix, which is generated randomly. There are grass, everything eater and grass eater, bomb, meat and a dog.
Everything eater eats everything ;), grass eater eats only grass.Dog eats meat and can be eaten by everything eater.

### Bomb
The Bomb, it appears in a random place, after it fires up every 8 cell near him fullfills with grassEaters. The grassEaters are real so after that they start moving and eating grasses.
By clicking on the matrix it will automaticly add a Bomb !
## Click
If you click on the canvas it by default will add grass, but if you choose predator from the navbar it will add predator.
## Add grass eater random
Adds random grass eater in the matrix

Server will start on Port 3000 by default. If you would want to change it, just go [server.js:64].
