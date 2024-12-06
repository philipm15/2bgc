import {AreaNode} from "../nodes/area-node.js";
import {loadImageByPath} from "../lib/image.js";

export class Wall extends AreaNode {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    loadImage() {
        const filePath = './sprites/wall.jpg';
        return loadImageByPath(filePath)
            .then(image => {
                this.sprite = image
            })
    }
}