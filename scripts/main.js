const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const VELOCITY = 160;
const WIDTH = 100;
const HEIGHT = 100;
const DEFAULT_GAP_SIZE = 40;
const DEFAULT_GROW_SPEED = 100;
const MINIMUM_GAP_SCALE = 0.2;
let x = 100;
let y = 300;
let xVelocity = 0;
let yVelocity = 0;
let prevTotalRunningTime = 0;
let deltaTime = 0;
let gapData = {
    currentGap: DEFAULT_GAP_SIZE,
    growing: false,
    growSpeed: DEFAULT_GROW_SPEED
}

function gameLoop(totalRunningTime) {
    deltaTime = totalRunningTime - prevTotalRunningTime; // Time in milliseconds between frames
    deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.

    update();  // Update certain values (e.g. positions)
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Completely clear the canvas for the next graphical output 
    draw(); //Draw the game visuals based on the values of the current frame

    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function update() { // Updates the game's state on every frame
    x += xVelocity * deltaTime; // Adjust x and y position based on velocity and time elapsed since last frame ( == deltaTime)
    y += yVelocity * deltaTime;

    if (gapData.growing) {
        gapData.currentGap += gapData.growSpeed * deltaTime;

        if (gapData.currentGap >= DEFAULT_GAP_SIZE) {
            gapData.growing = false;
        }
    } else {
        gapData.currentGap -= gapData.growSpeed * deltaTime;

        if (gapData.currentGap <= Math.round(DEFAULT_GAP_SIZE * MINIMUM_GAP_SCALE)) {
            gapData.growing = true;
        }
    }
}

function draw() {
    const rectHeight = (HEIGHT / 2) - (gapData.currentGap / 2)
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(x, y, WIDTH, rectHeight);
    ctx.fillStyle = "#00ff00"
    ctx.fillRect(x, y + rectHeight + gapData.currentGap, WIDTH, rectHeight);
}

function move(event) {
    switch (event.key) {
        case "d":
            xVelocity = VELOCITY;
            yVelocity = 0;
            break;
        case "a":
            xVelocity = -VELOCITY;
            yVelocity = 0;
            break;
        case "w":
            xVelocity = 0;
            yVelocity = -VELOCITY;
            break;
        case "s":
            xVelocity = 0;
            yVelocity = VELOCITY;
            break;
    }
}

function stop() {
    xVelocity = 0;
    yVelocity = 0;
}

requestAnimationFrame(gameLoop);
document.addEventListener("keydown", move);
document.addEventListener("keyup", stop);


