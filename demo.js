
// Minesweeper code 
let dimension = 9
let flags = 0;
let tilesRevealed = 0;
let gameover = false;
const gridContainer = document.getElementById('minegrid');
const tiles = Array.from({ length: dimension }, () => Array(dimension));


for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
        const tile = document.createElement('div');
        tile.classList.add('start', 'minetile');
        tile.dataset.row = i;
        tile.dataset.col = j;
        gridContainer.appendChild(tile);
        tiles[i][j] = tile;
    }
}

function updateFlags() {
    const digit1 = Math.floor(flags / 100) % 10;
    const digit2 = Math.floor(flags / 10) % 10;
    const digit3 = flags % 10;
    
    document.getElementById('flags1').src = `media/mine-time${digit1}.png`;
    document.getElementById('flags2').src = `media/mine-time${digit2}.png`;
    document.getElementById('flags3').src = `media/mine-time${digit3}.png`;
}

function resetGame() {
    gameover = false;
    tilesRevealed = 0;
    flags = 0;

    // reset face
    document.getElementById('dude').src = 'media/play.png';

    // stop + reset timer
    stopTimer();
    seconds = 0;
    document.getElementById('timer1').src = 'media/mine-time0.png';
    document.getElementById('timer2').src = 'media/mine-time0.png';
    document.getElementById('timer3').src = 'media/mine-time0.png';

    // reset flags
    document.getElementById('flags1').src = 'media/mine-time0.png';
    document.getElementById('flags2').src = 'media/mine-time0.png';
    document.getElementById('flags3').src = 'media/mine-time0.png';

    // clear grid
    gridContainer.innerHTML = '';

    // rebuild tiles
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            const tile = document.createElement('div');
            tile.classList.add('start', 'minetile');
            tile.dataset.row = i;
            tile.dataset.col = j;
            tile.addEventListener('click', () => {
                if (gameover) return;
                    revealTile(i, j);
            });

            tile.addEventListener('contextmenu', e => {
                e.preventDefault();
                if (gameover) return;
                if (tile.classList.contains('revealedTile')) return;

                tile.classList.toggle('flaggedTile');

                if (tile.classList.contains('flaggedTile')) {
                    flags++;
                } else {
                    flags--;
                }
                updateFlags();
            });

            gridContainer.appendChild(tile);
            tiles[i][j] = tile;
        }
    }

    // rebuild mine matrix
    mine_matrix = Array.from({ length: dimension }, () =>
        Array(dimension).fill(null)
    );

    for (let i = 0; i < 10; i++) {
        let ind = Math.floor(Math.random() * (dimension * dimension));
        while (mine_matrix[Math.floor(ind / dimension)][ind % dimension] != null) {
            ind = Math.floor(Math.random() * (dimension * dimension));
        }
        mine_matrix[Math.floor(ind / dimension)][ind % dimension] = -1;
    }

    // recalc numbers
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            if (mine_matrix[i][j] !== -1) {
                let count = 0;
                for (let di = -1; di <= 1; di++) {
                    for (let dj = -1; dj <= 1; dj++) {
                        const ni = i + di;
                        const nj = j + dj;
                        if (
                            ni >= 0 &&
                            ni < dimension &&
                            nj >= 0 &&
                            nj < dimension &&
                            mine_matrix[ni][nj] === -1
                        ) {
                            count++;
                        }
                    }
                }
                mine_matrix[i][j] = count;
            }
        }
    }

    startTimer();
}


function revealTile(row, col) {
    // bounds check
    console.log(`Revealing ${row},${col}`);
    if (row < 0 || row >= dimension || col < 0 || col >= dimension) return;

    const tile = tiles[row][col];

    // stop recursion
    if (tile.classList.contains('revealedTile')) return;
    if (tile.classList.contains('flaggedTile')) return;

    tile.classList.add('revealedTile');

    const value = mine_matrix[row][col];

    if (value === -1) {
        tile.innerHTML = '<img src="media/mine.png" style="width:12px; height:12px;" draggable="false">';
        document.getElementById('dude').src = 'media/lose.png'
        gameover = true;
        stopTimer();
        return;
    }

    tilesRevealed++;

    if (tilesRevealed === dimension * dimension - 10) {
        document.getElementById('dude').src = 'media/win.png'
        gameover = true;
        stopTimer();
    }

    if (value > 0) {
        tile.textContent = value;
        return;
    } else {
        tile.textContent = "";
        // flood-fill neighbors safely
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr !== 0 || dc !== 0) {
                    const ni = row + dr;
                    const nj = col + dc;
                    if (ni >= 0 && ni < dimension && nj >= 0 && nj < dimension) {
                        const neighbor = tiles[ni][nj];
                        if (!neighbor.classList.contains('revealedTile')) {
                            revealTile(ni, nj);
                        }
                    }
                }
            }
        }
    }
}

/*document.querySelectorAll('.minetile').forEach(tile => {
    tile.addEventListener('click', () => {
        if (gameover) return;
        const row = Number(tile.dataset.row);
        const col = Number(tile.dataset.col);
        revealTile(row, col);
    });

    tile.addEventListener('contextmenu', e => {
        e.preventDefault();
        if (gameover) return;
        if (tile.classList.contains('revealedTile')) return;
        tile.classList.toggle('flaggedTile');
        if (tile.classList.contains('flaggedTile')) {
            flags++;
            updateFlags();
        } else {
            flags--;
            updateFlags();
        }
    });
});*/

var mine_matrix = Array.from({ length: dimension }, () => Array(dimension).fill(null));
for (let i=0; i<10; i++) {
    let ind = Math.floor(Math.random() * (dimension*dimension));
    while (mine_matrix[Math.floor(ind/dimension)][ind%dimension] != null) {
        ind = Math.floor(Math.random() * (dimension*dimension));
    }
    mine_matrix[Math.floor(ind/dimension)][ind%dimension] = -1;
}

for (let i=0; i<dimension; i++) {
    for (let j=0; j<dimension; j++) {
        if (mine_matrix[i][j] != -1) {
            let count = 0;
            if (i>0) {
                if(mine_matrix[i-1][j] == -1)count++;
                if (j>0) {
                    if(mine_matrix[i-1][j-1] == -1)count++;
                }
            }
            if (j>0) {
                if(mine_matrix[i][j-1] == -1)count++;
                if (i<dimension-1) {
                    if(mine_matrix[i+1][j-1] == -1)count++;
                }
            }
            if (i<dimension-1) {
                if(mine_matrix[i+1][j] == -1) count++;
                if (j<dimension-1) {
                    if(mine_matrix[i+1][j+1] == -1)count++;
                }
            }
            if (j<dimension-1) {
                if(mine_matrix[i][j+1] == -1) count++;
                if (i>0) {
                    if(mine_matrix[i-1][j+1] == -1)count++;
                }
            }
            mine_matrix[i][j]=count;
        }
    }
}


let timerInterval = null;
let seconds = 0;

function updateTimer() {
    seconds++;
    const digit1 = Math.floor(seconds / 100) % 10;
    const digit2 = Math.floor(seconds / 10) % 10;
    const digit3 = seconds % 10;
    
    document.getElementById('timer1').src = `media/mine-time${digit1}.png`;
    document.getElementById('timer2').src = `media/mine-time${digit2}.png`;
    document.getElementById('timer3').src = `media/mine-time${digit3}.png`;
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    seconds = -1;
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Add event listener to smile button
document.querySelector('.smile').addEventListener('click', () => {
    resetGame();
});

let topZ = 10;
document.querySelectorAll('.cls').forEach(btn => {
    btn.addEventListener('click', () => {
        const win = btn.closest('.window-98');

        const taskbarBtn = document.querySelector(`[data-window-id="${win.id}"]`);
        if (taskbarBtn) taskbarBtn.remove();

        const material = win.animate([
            {opacity: 1, transform: 'scale(1)'},
            {opacity: 0, transform: 'scale(0.98)'}
        ], {
            duration: 80,
            easing: 'ease-out',
            fill: 'forwards'
        });
        material.addEventListener('finish', () => {
            win.remove();
        })
    });
});

document.querySelectorAll('.max').forEach(btn => {
    btn.addEventListener('click', () => {
        const win = btn.closest('.window-98');
        //keep original window size in old variables, change between maximized window and not
        if (win.style.width !== '100vw') {
            const computed = getComputedStyle(win);
            win.oldWidth = computed.width;
            win.oldHeight = computed.height;
            win.oldTop = computed.top;
            win.oldLeft = computed.left;
            win.style.transition = '10ms';
            win.style.width = '100vw';
            win.style.height = '100%';
            win.style.top = '0';
            win.style.left = '0';
        } else {
            win.style.width = win.oldWidth;
            win.style.height = win.oldHeight;
            win.style.top = win.oldTop;
            win.style.left = win.oldLeft;
        }
    });
});

document.querySelectorAll('.taskbar-window').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.taskbar-window').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const windowId = btn.dataset.windowId;
        const win = document.getElementById(windowId);
        if (win) {
            topZ++;
            win.style.zIndex = topZ;
        }
    });
});

document.querySelectorAll('.window-98').forEach(win => {
    topZ++;
    win.style.zIndex = topZ++;
    
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const header = win.querySelector('.window-header') || win;

    header.style.cursor = 'move';
    header.addEventListener('mousedown', e => {
        e.preventDefault(); //prevents text and image highlighting while dragging
        isDragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
    });
    win.addEventListener('mousedown', e => {
        topZ++;
        win.style.zIndex = topZ;

        //fix selected win in taskbar
        document.querySelectorAll('.taskbar-window').forEach(b => b.classList.remove('active'));
        const taskbarBtn = document.querySelector(`[data-window-id="${win.id}"]`);
        if (taskbarBtn) taskbarBtn.classList.add('active');
    })

    // keep window movement bounded to t-container
    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        
        const container = document.querySelector('.t-container');
        const containerRect = container.getBoundingClientRect();
        
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;
        
        newLeft = Math.max(0, Math.min(newLeft, containerRect.width - win.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, containerRect.height - win.offsetHeight));
        
        win.style.left = newLeft + 'px';
        win.style.top = newTop + 'px';
    });

    document.addEventListener('mouseup', () => isDragging = false);
});
startTimer();

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 to 12
  const minsStr = minutes < 10 ? '0' + minutes : minutes;
  if (document.getElementById('clock').textContent != `${hours}:${minsStr} ${ampm}`) {
    document.getElementById('clock').textContent = `${hours}:${minsStr} ${ampm}`;
  }
}
setInterval(updateClock, 1000);
updateClock(); // run once on load