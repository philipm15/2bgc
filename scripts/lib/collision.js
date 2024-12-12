export function checkCollision(node1, node2) {
    if (node1 === node2) return false;

    const bounds1 = node1.getBoxBounds();
    const bounds2 = node2.getBoxBounds();

    return (
        bounds1.right >= bounds2.left &&
        bounds1.left <= bounds2.right &&
        bounds1.bottom >= bounds2.top &&
        bounds1.top <= bounds2.bottom
    );
}