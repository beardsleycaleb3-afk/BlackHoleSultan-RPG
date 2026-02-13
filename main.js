// Attach functions to window so the HTML 'onclick' can always find them
window.currentView = 'view-start';
window.playerPos = { x: 2, y: 2 };
const floorAssets = ['GW1.png', 'GWTopedge.png', 'GWbottomedgeT.png'];
const mapData = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
];

window.changeView = function(id) {
    document.querySelectorAll('.game-view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(id);
    if(target) {
        target.classList.add('active');
        window.currentView = id;
    }
};

window.handleActionA = function() {
    if (window.currentView === 'view-start') {
        window.changeView('view-map');
    }
};

window.move = function(dir) {
    if (window.currentView !== 'view-map') return;
    let nx = window.playerPos.x;
    let ny = window.playerPos.y;
    const p = document.getElementById('player');

    if (dir === 'up') { ny--; p.style.backgroundImage = "url('N_IdleRS.png')"; }
    if (dir === 'down') { ny++; p.style.backgroundImage = "url('S_IdleRS.png')"; }
    if (dir === 'left') { nx--; p.style.backgroundImage = "url('W_IdleRS.png')"; }
    if (dir === 'right') { nx++; p.style.backgroundImage = "url('E_IdleRS.png')"; }

    if (mapData[ny] && mapData[ny][nx] === 0) {
        window.playerPos.x = nx;
        window.playerPos.y = ny;
        p.style.left = (nx * 10) + '%';
        p.style.top = (ny * 10) + '%';
    }
};

// Auto-draw map
const grid = document.getElementById('map-grid');
if(grid) {
    mapData.forEach(row => {
        row.forEach(cell => {
            const div = document.createElement('div');
            div.className = 'tile';
            if (cell === 1) div.style.backgroundImage = "url('NWYBorder.png')";
            else div.style.backgroundImage = `url('${floorAssets[Math.floor(Math.random()*3)]}')`;
            grid.appendChild(div);
        });
    });
}
