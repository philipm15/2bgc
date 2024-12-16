import {AreaNode} from "../nodes/area-node.js";
import {loadImageByPath} from "../lib/image.js";
import {Pacman} from "./pacman.js";

export class Candy extends AreaNode {

    constructor(x, y) {
        super(x,y, 45, 45);
    }

    loadImage() {
        const filePath = './sprites/candy.png';
        return loadImageByPath(filePath)
            .then(image => {
                this.sprite = image
            })
    }

    onCollision(node) {
        if(node instanceof Pacman) {
        // console.log({node})
            this.destroy();
        }
    }
}
