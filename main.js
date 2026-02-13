const player = document.getElementById('player');
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
const speed = 16; // Moves half a tile per tap

function move(direction) {
    if (direction === 'up') posY -= speed;
    if (direction === 'down') posY += speed;
    if (direction === 'left') posX -= speed;
    if (direction === 'right') posX += speed;

    player.style.top = posY + 'px';
    player.style.left = posX + 'px';
}
