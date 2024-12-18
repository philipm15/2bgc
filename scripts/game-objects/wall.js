import {AreaNode} from "../nodes/area-node.js";

export class Wall extends AreaNode {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.animatedSpriteNode.setConfig({
            spritePath: 'sprites/wall.jpg',
        })
    }
}