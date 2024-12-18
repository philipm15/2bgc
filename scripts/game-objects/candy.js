import {AreaNode} from "../nodes/area-node.js";

export class Candy extends AreaNode {

    constructor(x, y) {
        super(x,y, 45, 45);
        this.animatedSpriteNode.setConfig({
            spritePath: 'sprites/candy.png',
        })
    }
}
