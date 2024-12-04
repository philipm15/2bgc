import { GameLoop } from "../nodes/game.js";
import { CANVAS } from "./global.js";
import { PacmanNode } from "../nodes/pacman.js";

const gameLoop = new GameLoop(CANVAS);
const pacman = new PacmanNode(100, 300);
// await pacman.loadImages();
gameLoop.addCharacters([pacman]);
gameLoop.start();