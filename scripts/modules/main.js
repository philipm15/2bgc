import { GameLoop } from "../game-objects/game.js";
import { CANVAS } from "./global.js";
import { PacmanNode } from "../game-objects/pacman.js";

const coordsElement = document.getElementById('coords');

const gameLoop = new GameLoop(CANVAS);
const pacman = new PacmanNode(100, 300);

pacman.updateCallback = () => {
    coordsElement.innerText = `${Math.round(pacman.x)}, ${Math.round(pacman.y)}`;
}

gameLoop.addCharacters([pacman]);
gameLoop.start();