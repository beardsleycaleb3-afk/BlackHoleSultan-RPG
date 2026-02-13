const player = document.getElementById('player');
let posX = window.innerWidth / 2;
let posY = (window.innerHeight * 0.7) / 2;
const speed = 20;

// PAGE ROUTER
function changePage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// MOVEMENT LOGIC
function move(direction) {
    if (direction === 'up') {
        player.style.backgroundImage = "url('N_IdleRS.png')";
        if (posY > 40) posY -= speed;
    }
    if (direction === 'down') {
        player.style.backgroundImage = "url('S_IdleRS.png')";
        if (posY < (window.innerHeight * 0.7) - 40) posY += speed;
    }
    if (direction === 'left') {
        player.style.backgroundImage = "url('W_IdleRS.png')";
        if (posX > 40) posX -= speed;
    }
    if (direction === 'right') {
        player.style.backgroundImage = "url('E_IdleRS.png')";
        if (posX < window.innerWidth - 40) posX += speed;
    }
    player.style.top = posY + 'px';
    player.style.left = posX + 'px';
}
