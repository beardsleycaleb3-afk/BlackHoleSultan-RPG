const game = {
    view: 'view-start',
    pos: { x: 4, y: 4 },
    floorTypes: ['GW1.png', 'GWTopedge.png', 'GWbottomedgeT.png'],
    
    mapLayout: [
        [1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,0,0,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,1,1,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1]
    ],

    init() {
        this.drawMap();
        this.updatePlayer();
    },

    switch(id) {
        document.querySelectorAll('.game-view').forEach(v => v.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        this.view = id;
    },

    drawMap() {
        const grid = document.getElementById('map-grid');
        grid.innerHTML = '';
        this.mapLayout.forEach(row => {
            row.forEach(cell => {
                const tile = document.createElement('div');
                tile.className = 'tile';
                if (cell === 1) tile.style.backgroundImage = "url('NWYBorder.png')";
                else tile.style.backgroundImage = `url('${this.floorTypes[Math.floor(Math.random()*3)]}')`;
                grid.appendChild(tile);
            });
        });
    },

    move(dir) {
        if (this.view !== 'view-map') return;
        let nx = this.pos.x, ny = this.pos.y;
        const p = document.getElementById('player');
        
        if (dir === 'up') { ny--; p.style.backgroundImage = "url('N_IdleRS.png')"; }
        if (dir === 'down') { ny++; p.style.backgroundImage = "url('S_IdleRS.png')"; }
        if (dir === 'left') { nx--; p.style.backgroundImage = "url('W_IdleRS.png')"; }
        if (dir === 'right') { nx++; p.style.backgroundImage = "url('E_IdleRS.png')"; }

        if (this.mapLayout[ny] && this.mapLayout[ny][nx] === 0) {
            this.pos.x = nx; this.pos.y = ny;
            this.updatePlayer();
        }
    },

    updatePlayer() {
        const p = document.getElementById('player');
        p.style.left = (this.pos.x * 10) + '%';
        p.style.top = (this.pos.y * 10) + '%';
    },

    btnA() {
        if (this.view === 'view-start') this.switch('view-map');
    }
};

game.init();
