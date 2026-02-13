const player = document.getElementById('player');

// Initial Position (Center of the 75% viewport)
let posX = window.innerWidth / 2;
let posY = (window.innerHeight * 0.75) / 2;
const speed = 20;

function move(direction) {
    // 1. TURN THE CHARACTER
    if (direction === 'up') {
        player.style.backgroundImage = "url('N_IdleRS.png')";
        if (posY > 40) posY -= speed; // Stop at top edge
    }
    if (direction === 'down') {
        player.style.backgroundImage = "url('S_IdleRS.png')";
        if (posY < (window.innerHeight * 0.75) - 40) posY += speed; // Stop at bottom edge
    }
    if (direction === 'left') {
        player.style.backgroundImage = "url('W_IdleRS.png')";
        if (posX > 40) posX -= speed; // Stop at left edge
    }
    if (direction === 'right') {
        player.style.backgroundImage = "url('E_IdleRS.png')";
        if (posX < window.innerWidth - 40) posX += speed; // Stop at right edge
    }

    // 2. APPLY MOVEMENT
    player.style.top = posY + 'px';
    player.style.left = posX + 'px';
}
