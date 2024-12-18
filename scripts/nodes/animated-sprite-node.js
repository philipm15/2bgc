import {loadImageByPath} from "../lib/image.js";

/**
 * @param animatedSpriteConfig {Partial<{spritePath: string, numberOfSprites: number, animationSpeed: number, currentAnimationSpeed: number, spriteAnimationMovingFactor: number}>}
 */
export class AnimatedSpriteNode {
    sprites = [];
    spritePath = '';
    numberOfSprites = 1;
    animationSpeed = 80;
    currentAnimationSpeed = this.animationSpeed;
    spriteAnimationMovingFactor = 0.6;

    constructor(
        animatedSpriteConfig
    ) {
        if(animatedSpriteConfig) {
            this.setConfig(animatedSpriteConfig);
        }
    }

    /**
     * @param animatedSpriteConfig {Partial<{spritePath: string, numberOfSprites: number, animationSpeed: number, currentAnimationSpeed: number, spriteAnimationMovingFactor: number}>}
     */
    setConfig(animatedSpriteConfig) {
        (Object || {}).keys(animatedSpriteConfig).forEach(key => {
            this[key] = animatedSpriteConfig[key];
        })
    }

    loadImages() {
        if(!this.spritePath) return Promise.resolve();

        return new Promise((resolve, reject) => {
            const promises = [];
            if (this.numberOfSprites > 1) {
                for (let i = 0; i < this.numberOfSprites; i++) {
                    promises.push(loadImageByPath(this.spritePath.replace('{{i}}', i.toString())));
                }
            } else {
                promises.push(loadImageByPath(this.spritePath));
            }

            Promise.all(promises)
                .then(images => {
                    this.sprites = images
                    resolve();
                })
                .catch(reject);
        });
    }

    setAnimationMovingSpeed() {
        this.currentAnimationSpeed = this.animationSpeed * this.spriteAnimationMovingFactor;
    }

    resetAnimationSpeed() {
        this.currentAnimationSpeed = this.animationSpeed;
    }
}