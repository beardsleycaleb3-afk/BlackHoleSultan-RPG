const TILE_SIZE = 40;
const MAP_SIZE = 25;
const SPEED = 7;

window.playerX = 520;
window.playerY = 520;
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
            
            if (x === 0 || x === MAP_SIZE-1 || y === 0 || y === MAP_SIZE-1) {
                div.style.backgroundColor = '#d4af37';
                row.push(1); 
            } 
            else if (y === 1 || y === MAP_SIZE - 2) {
                div.style.backgroundColor = '#228B22';
                row.push(0); 
            }
            else {
                div.style.backgroundColor = '#90EE90';
                row.push(0); 
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
        window.playerX = 520;
        window.playerY = 520;
    }
};

window.toggleUI = function(id) {
    const el = document.getElementById(id);
    if (!el) return;
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

window.stopMove = function() { 
    window.isMoving = false; 
    window.moveDir = ''; 
};

function gameLoop() {
    if (!window.isMoving) return;
    
    let nx = window.playerX, ny = window.playerY;
    const p = document.getElementById('player');

    // EXACT FILENAMES - NO SPACES
    if (window.moveDir === 'up') { 
        ny -= SPEED; 
        p.style.backgroundImage = "url('N_IdleRS.png')"; 
    }
    if (window.moveDir === 'down') { 
        ny += SPEED; 
        p.style.backgroundImage = "url('S_IdleRS.png')"; 
    }
    if (window.moveDir === 'left') { 
        nx -= SPEED; 
        p.style.backgroundImage = "url('W_IdleRS.png')"; 
    }
    if (window.moveDir === 'right') { 
        nx += SPEED; 
        p.style.backgroundImage = "url('E_IdleRS.png')"; 
    }

    let gx = Math.max(0, Math.min(MAP_SIZE-1, Math.floor((nx + 20) / TILE_SIZE)));
    let gy = Math.max(0, Math.min(MAP_SIZE-1, Math.floor((ny + 20) / TILE_SIZE)));

    if (mapData[gy] && mapData[gy][gx] === 0) {
        window.playerX = nx; 
        window.playerY = ny;
        updateCamera();
    }
    
    requestAnimationFrame(gameLoop);
}

function updateCamera() {
    const p = document.getElementById('player');
    const m = document.getElementById('map-layer');
    const v = document.getElementById('viewport');
    
    if (!p || !m || !v) return;
    
    p.style.left = window.playerX + 'px';
    p.style.top = window.playerY + 'px';
    
    const mapW = MAP_SIZE * TILE_SIZE;
    const mapH = MAP_SIZE * TILE_SIZE;
    const viewW = v.clientWidth;
    const viewH = v.clientHeight;
    
    let camX = (viewW/2) - window.playerX - 20;
    let camY = (viewH/2) - window.playerY - 20;
    
    camX = Math.max(-(mapW - viewW), Math.min(0, camX));
    camY = Math.max(-(mapH - viewH), Math.min(0, camY));
    
    m.style.transform = `translate(${camX}px, ${camY}px)`;
}

window.addEventListener('load', updateCamera);
