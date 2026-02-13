const player = document.getElementById('player');

// Starting positions
let posX = window.innerWidth / 2;
let posY = (window.innerHeight * 0.7) / 2;
const speed = 20;

// PAGE ROUTER: This handles switching between Start, Game, Battle, and Items
function changePage(pageId) {
    // Hide all pages by removing the 'active' class
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none'; // Explicitly hide
    });

    // Show the selected page
    const activePage = document.getElementById(pageId);
    activePage.classList.add('active');
    activePage.style.display = 'flex'; // Explicitly show
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
