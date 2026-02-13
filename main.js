const TILE_SIZE = 40;
const MAP_SIZE = 25; // 25x25 world
const SPEED = 7;

window.playerX = 120;
window.playerY = 120;
window.isMoving = false;
window.moveDir = '';
let mapData = [];

function initMap() {
    const mapLayer = document.getElementById('map-layer');
    mapLayer.innerHTML = '';
    mapLayer.style.gridTemplateColumns = `repeat(${MAP_SIZE}, ${TILE_SIZE}px)`;
    
    mapData = [];
    for (let y = 0; y < MAP_SIZE; y++) {
        let row = [];
        for (let x = 0; x < MAP_SIZE; x++) {
            const div = document.createElement('div');
            div.className = 'tile';
            
            // 1. IS IT THE YELLOW BORDER? (Edges of the 25x25 map)
            if (x === 0 || x === MAP_SIZE-1 || y === 0 || y === MAP_SIZE-1) {
                div.style.backgroundImage = "url('NWYBorder.png')";
                row.push(1); // Solid
            } 
            // 2. IS IT THE TOP EDGE? (Inside the border)
            else if (y === 1) {
                div.style.backgroundImage = "url('GWTopedge.png')";
                row.push(0); // Walkable
            }
            // 3. IS IT THE BOTTOM EDGE? (Inside the border)
            else if (y === MAP_SIZE - 2) {
                div.style.backgroundImage = "url('GWbottomedgeT.png')";
                row.push(0); // Walkable
            }
            // 4. EVERYTHING ELSE IS THE MIDDLE FLOOR
            else {
                div.style.backgroundImage = "url('GW1.png')";
                row.push(0); // Walkable
            }
            
            mapLayer.appendChild(div);
        }
        mapData.push(row);
    }
}

window.actionA = function() {
    const startView = document.getElementById('view-start');
    if (startView.classList.contains('active')) {
        startView.classList.remove('active');
        document.getElementById('world-container').classList.add('active-world');
        initMap();
        updateCamera();
    }
};

window.toggleUI = function(id) {
    const el = document.getElementById(id);
    const wasActive = el.classList.contains('active');
    document.querySelectorAll('.ui-layer').forEach(l => l.classList.remove('active'));
    if (!wasActive) el.classList.add('active');
};

window.startMove = function(dir) {
    window.moveDir = dir;
    if (!window.isMoving) { 
        window.isMoving = true; 
        requestAnimationFrame(gameLoop); 
    }
};

window.stopMove = function() { window.isMoving = false; };

function gameLoop() {
    if (!window.isMoving) return;
    let nx = window.playerX, ny = window.playerY;
    const p = document.getElementById('player');

    if (window.moveDir === 'up') { ny -= SPEED; p.style.backgroundImage = "url('N_IdleRS.png')"; }
    if (window.moveDir === 'down') { ny += SPEED; p.style.backgroundImage = "url('S_IdleRS.png')"; }
    if (window.moveDir === 'left') { nx -= SPEED; p.style.backgroundImage = "url('W_IdleRS.png')"; }
    if (window.moveDir === 'right') { nx += SPEED; p.style.backgroundImage = "url('E_IdleRS.png')"; }

    // Collision check
    let gx = Math.floor((nx + 20) / TILE_SIZE);
    let gy = Math.floor((ny + 20) / TILE_SIZE);

    if (mapData[gy] && mapData[gy][gx] === 0) {
        window.playerX = nx; window.playerY = ny;
        updateCamera();
    }
    requestAnimationFrame(gameLoop);
}

function updateCamera() {
    const p = document.getElementById('player');
    const m = document.getElementById('map-layer');
    const v = document.getElementById('viewport');
    p.style.left = window.playerX + 'px';
    p.style.top = window.playerY + 'px';
    m.style.transform = `translate(${(v.clientWidth/2)-window.playerX-20}px, ${(v.clientHeight/2)-window.playerY-20}px)`;
}
