// All your walkable floor textures from GitHub
const floorTextures = [
    'GW1.png', 
    'GWTopedge.png', 
    'GWbottomedgeT.png'
];

function drawMap() {
    const grid = document.getElementById('map-grid');
    grid.innerHTML = '';

    mapLayout.forEach((row, y) => {
        row.forEach((tileType, x) => {
            const div = document.createElement('div');
            div.className = 'tile';
            
            if (tileType === 1) {
                // This is an inner wall or border
                div.style.backgroundImage = "url('NWYBorder.png')";
            } else {
                // Pick a RANDOM floor tile from your library
                const randomFloor = floorTextures[Math.floor(Math.random() * floorTextures.length)];
                div.style.backgroundImage = `url('${randomFloor}')`;
            }
            grid.appendChild(div);
        });
    });
}
