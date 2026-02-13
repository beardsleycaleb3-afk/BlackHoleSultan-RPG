// CONFIG
const TILE_SIZE = 40;
const MAP_WIDTH = 50; 
const MAP_HEIGHT = 50;
const SPEED = 8;

// STATE
window.playerX = 160; // Spawned safely away from edges
window.playerY = 160;
window.isMoving = false;
window.moveDir = '';
window.gameLoopId = null;

const floorAssets = ['GW1.png', 'GWTopedge.png', 'GWbottomedgeT.png'];
let mapData = []; // 0 = Walkable, 1 = Solid Wall

function generateMap() {
    mapData = [];
    for(let y=0; y<MAP_HEIGHT; y++) {
        let row = [];
        for(let x=0; x<MAP_WIDTH; x++) {
            // Create a solid yellow border around the 50x50 world
            if (x===0 || x===MAP_WIDTH-1 || y===0 || y===MAP_HEIGHT-1) {
                row.push(1); 
            } else {
                row.push(0); // Everything else is walkable floor
            }
        }
        mapData.push(row);
    }
}

window.actionA = function() {
    const startView = document.getElementById('view-start');
    if (startView && startView.classList.contains('active')) {
        startView.classList.remove('active');
        document.getElementById('world-container').classList.add('active-world');
        initGame();
    }
};

function initGame() {
    generateMap();
    const mapLayer = document.getElementById('map-layer');
    mapLayer.style.width = (MAP_WIDTH * TILE_SIZE) + 'px';
    mapLayer.style.height = (MAP_HEIGHT * TILE_SIZE) + 'px';
    mapLayer.style.gridTemplateColumns = `repeat(${MAP_WIDTH}, ${TILE_SIZE}px)`;

    mapLayer.innerHTML = '';
    mapData.forEach(row => {
        row.forEach(cell => {
            const div = document.createElement('div');
            div.className = 'tile';
            if(cell === 1) {
                div.style.backgroundImage = "url('NWYBorder.png')";
            } else {
                // Randomly pick one of your 3 floor tiles for visual variety
                const randomIndex = Math.floor(Math.random() * floorAssets.length);
                div.style.backgroundImage = `url('${floorAssets[randomIndex]}')`;
            }
            grid.appendChild(div); // Wait, make sure grid is defined
        });
    });
    // Fix: Ensuring we append to mapLayer
    mapData.forEach((row, y) => {
        row.forEach((cell, x) => {
            const div = document.createElement('div');
            div.className = 'tile';
            if(cell === 1) {
                div.style.backgroundImage = "url('NWYBorder.png')";
            } else {
                const randomFloor = floorAssets[Math.floor(Math.random() * floorAssets.length)];
                div.style.backgroundImage = `url('${randomFloor}')`;
            }
            mapLayer.appendChild(div);
        });
    });
    updateCamera();
}

window.toggleUI = function(id) {
    const el = document.getElementById(id);
    if(!el) return;
    const wasActive = el.classList.contains('active');
    document.querySelectorAll('.ui-layer').forEach(l => l.classList.remove('active'));
    if(!wasActive) el.classList.add('active');
};

window.startMove = function(dir) {
    window.moveDir = dir;
    if(!window.isMoving) {
        window.isMoving = true;
        gameLoop();
    }
};

window.stopMove = function() {
    window.isMoving = false;
    cancelAnimationFrame(window.gameLoopId);
};

function gameLoop() {
    if(!window.isMoving) return;

    let nextX = window.playerX;
    let nextY = window.playerY;
    const playerDiv = document.getElementById('player');

    if(window.moveDir === 'up') { nextY -= SPEED; playerDiv.style.backgroundImage = "url('N_IdleRS.png')"; }
    if(window.moveDir === 'down') { nextY += SPEED; playerDiv.style.backgroundImage = "url('S_IdleRS.png')"; }
    if(window.moveDir === 'left') { nextX -= SPEED; playerDiv.style.backgroundImage = "url('W_IdleRS.png')"; }
    if(window.moveDir === 'right') { nextX += SPEED; playerDiv.style.backgroundImage = "url('E_IdleRS.png')"; }

    // Collision Check: Find the tile coordinate for the player's center
    let gridX = Math.floor((nextX + 20) / TILE_SIZE);
    let gridY = Math.floor((nextY + 20) / TILE_SIZE);

    // Only move if the tile is a '0' (Walkable Floor)
    if(mapData[gridY] && mapData[gridY][gridX] === 0) {
        window.playerX = nextX;
        window.playerY = nextY;
        updateCamera();
    }

    window.gameLoopId = requestAnimationFrame(gameLoop);
}

function updateCamera() {
    const p = document.getElementById('player');
    const m = document.getElementById('map-layer');
    const v = document.getElementById('viewport');

    p.style.left = window.playerX + 'px';
    p.style.top = window.playerY + 'px';

    let camX = (v.clientWidth / 2) - window.playerX - 20;
    let camY = (v.clientHeight / 2) - window.playerY - 20;

    m.style.transform = `translate(${camX}px, ${camY}px)`;
}
