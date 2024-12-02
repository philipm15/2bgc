const VELOCITY = 160;
const SPRITE_ANIMATION_SPEED = 100; // change sprite every X ms
const SPITE_ANIMATION_MOVING_FACTOR = 0.6; // increase the animation speed when moving

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let x = 100;
let y = 300;
let xVelocity = 0;
let yVelocity = 0;
let prevTotalRunningTime = 0;
let deltaTime = 0;

const animationData = {
    currentAnimationSpeed: SPRITE_ANIMATION_SPEED,
    orientation: 'right',
    animationSprites: []
}

function gameLoop(totalRunningTime) {
    deltaTime = (totalRunningTime - prevTotalRunningTime) / 1000; // Time in milliseconds between frames
    prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.

    update();  // Update certain values (e.g. positions)
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Completely clear the canvas for the next graphical output 
    draw(); //Draw the game visuals based on the values of the current frame

    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function update() { // Updates the game's state on every frame
    x += xVelocity * deltaTime; // Adjust x and y position based on velocity and time elapsed since last frame ( == deltaTime)
    y += yVelocity * deltaTime;
}

function draw() {
    const spriteIndex = Math.floor(Date.now() / animationData.currentAnimationSpeed) % animationData.animationSprites.length;
    const sprite = animationData.animationSprites[spriteIndex];

    ctx.save(); // Save the current context state
    ctx.translate(x + sprite.width / 2, y + sprite.height / 2); // translate to the character position

    // rotate the context based on the character's direction
    switch (animationData.orientation) {
        case 'up':
            ctx.rotate(-Math.PI / 2);
            break;
        case 'down':
            ctx.rotate(Math.PI / 2);
            break;
        case 'left':
            ctx.rotate(Math.PI);
            ctx.scale(1, -1); // flip vertically
            break;
        case 'right':
            break;
    }

    ctx.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
    ctx.restore(); // restore the context to its original state
}

function move(event) {
    // Normalize the key value to lowercase in order to check for arrows keys more easily
    const key = event.key.toLowerCase();

    if (['w', 'arrowup'].includes(key)) {
        yVelocity = -VELOCITY;
        xVelocity = 0;
        animationData.orientation = 'up';
        animationData.currentAnimationSpeed = SPRITE_ANIMATION_SPEED * SPITE_ANIMATION_MOVING_FACTOR;
    }

    if (['s', 'arrowdown'].includes(key)) {
        yVelocity = VELOCITY;
        xVelocity = 0;
        animationData.orientation = 'down';
        animationData.currentAnimationSpeed = SPRITE_ANIMATION_SPEED * SPITE_ANIMATION_MOVING_FACTOR;
    }

    if (['a', 'arrowleft'].includes(key)) {
        xVelocity = -VELOCITY;
        yVelocity = 0;
        animationData.orientation = 'left';
        animationData.currentAnimationSpeed = SPRITE_ANIMATION_SPEED * SPITE_ANIMATION_MOVING_FACTOR;
    }

    if (['d', 'arrowright'].includes(key)) {
        xVelocity = VELOCITY;
        yVelocity = 0;
        animationData.orientation = 'right';
        animationData.currentAnimationSpeed = SPRITE_ANIMATION_SPEED * SPITE_ANIMATION_MOVING_FACTOR;
    }
}

function stop() {
    xVelocity = 0;
    yVelocity = 0;
    animationData.currentAnimationSpeed = SPRITE_ANIMATION_SPEED;
}

function loadImages() {
    const filePath = './sprites/PacMan{{i}}.png'
    const promises = [];

    for (let i = 0; i < 3; i++) {
        const image = new Image();
        image.src = filePath.replace('{{i}}', i.toString());
        promises.push(new Promise((resolve, reject) => {
            image.onload = () => resolve(image);
            image.onerror = reject;
        }));
    }

    return Promise.all(promises).then(images => {
        animationData.animationSprites = images;
    })
}

loadImages()
    .then(() => {
            requestAnimationFrame(gameLoop);
            document.addEventListener("keydown", move);
            document.addEventListener("keyup", stop);
        }
    ).catch(error => {
        console.error('Error loading images', error);
    }
)