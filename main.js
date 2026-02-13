// CONFIG
const TILE_SIZE = 40; // Pixels
const MAP_WIDTH = 50; // 50 tiles wide
const MAP_HEIGHT = 50; // 50 tiles high
const SPEED = 5;

// STATE
let playerX = 200; // Starting pixels
let playerY = 200;
let isMoving = false;
let moveDir = '';
let gameLoopId;

// ASSETS
const floorAssets = ['GW1.png', 'GWTopedge.png', 'GWbottomedgeT.png'];
// Simple random map generation (1 = Wall, 0 = Floor)
let mapData = [];

function generateMap() {
    for(let y=0; y<MAP_HEIGHT; y++) {
        let row = [];
        for(let x=0; x<MAP_WIDTH; x++) {
            // Borders are walls, random inner walls
            if (x===0 || x===MAP_WIDTH-1 || y===0 || y===MAP_HEIGHT-1) row.push(1);
            else if (Math.random() > 0.9) row.push(1); // 10% chance of random wall
            else row.push(0);
        }
        mapData.push(row);
    }
}

window.initGame = function() {
    generateMap();
    const mapLayer = document.getElementById('map-layer');
    
    // Set grid size
    mapLayer.style.width = (MAP_WIDTH * TILE_SIZE) + 'px';
    mapLayer.style.height = (MAP_HEIGHT * TILE_SIZE) + 'px';
    mapLayer.style.gridTemplateColumns = `repeat(${MAP_WIDTH}, ${TILE_SIZE}px)`;

    // Draw tiles
    mapLayer.innerHTML = '';
    mapData.forEach(row => {
        row.forEach(cell => {
            const div = document.createElement('div');
            div.className = 'tile';
            if(cell === 1) div.style.backgroundImage = "url('NWYBorder.png')";
            else div.style.backgroundImage = `url('${floorAssets[Math.floor(Math.random()*floorAssets.length)]}')`;
            mapLayer.appendChild(div);
        });
    });

    updateCamera();
};

window.actionA = function() {
    // Start Game
    document.getElementById('view-start').classList.remove('active');
    document.getElementById('world-container').classList.add('active-world');
    window.initGame();
};

window.toggleUI = function(id) {
    const el = document.getElementById(id);
    if(el.classList.contains('active')) {
        el.classList.remove('active');
    } else {
        // Close other menus first
        document.querySelectorAll('.ui-layer').forEach(l => l.classList.remove('active'));
        el.classList.add('active');
    }
};

// MOVEMENT LOOP
window.startMove = function(dir) {
    moveDir = dir;
    if(!isMoving) {
        isMoving = true;
        gameLoop();
    }
};

window.stopMove = function() {
    isMoving = false;
    cancelAnimationFrame(gameLoopId);
};

function gameLoop() {
    if(!isMoving) return;

    let nextX = playerX;
    let nextY = playerY;
    const playerDiv = document.getElementById('player');

    if(moveDir === 'up') { nextY -= SPEED; playerDiv.style.backgroundImage = "url('N_IdleRS.png')"; }
    if(moveDir === 'down') { nextY += SPEED; playerDiv.style.backgroundImage = "url('S_IdleRS.png')"; }
    if(moveDir === 'left') { nextX -= SPEED; playerDiv.style.backgroundImage = "url('W_IdleRS.png')"; }
    if(moveDir === 'right') { nextX += SPEED; playerDiv.style.backgroundImage = "url('E_IdleRS.png')"; }

    // Collision Check (Convert pixel to grid coord)
    let gridX = Math.floor((nextX + 20) / TILE_SIZE); // +20 for center of player
    let gridY = Math.floor((nextY + 20) / TILE_SIZE);

    if(mapData[gridY] && mapData[gridY][gridX] === 0) {
        playerX = nextX;
        playerY = nextY;
        updateCamera();
    }

    gameLoopId = requestAnimationFrame(gameLoop);
}

function updateCamera() {
    const playerDiv = document.getElementById('player');
    const mapLayer = document.getElementById('map-layer');
    const viewport = document.getElementById('viewport');

    // Place Player in World
    playerDiv.style.left = playerX + 'px';
    playerDiv.style.top = playerY + 'px';

    // Move Map Layer so Player is centered
    // Center = (ViewportWidth / 2) - PlayerX
    let camX = (viewport.clientWidth / 2) - playerX - (TILE_SIZE/2);
    let camY = (viewport.clientHeight / 2) - playerY - (TILE_SIZE/2);

    mapLayer.style.transform = `translate(${camX}px, ${camY}px)`;
}
