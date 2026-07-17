function initMinesweeper(windowEl) {
    const gridContainer = windowEl.querySelector('#minegrid');
    // all your tile-building, mine_matrix setup, etc. goes here
    // using windowEl.querySelector() instead of document.getElementById()
    
    // start of minesweeper
    // dimension is both height and width of minesweeper tiles 
    let dimension = 8
    // number of current flags placed on board
    let flags = 0;
    // number of current tiles revealed on board
    let tilesRevealed = 0;
    let mines = 10;
    let gameover = false;
    const tiles = Array.from({ length: dimension }, () => Array(dimension));
    let timerInterval = null;
    let seconds = 0;
    var mine_matrix = Array.from({ length: dimension }, () => Array(dimension).fill(null));

    function chordCheck(i, j) {
        //rewrote chord check
        let count = 0;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                const nx = i + dx;
                const ny = j + dy;
                if (nx >= 0 && nx < dimension && ny >= 0 && ny < dimension) {
                    if (tiles[nx][ny].classList.contains('flaggedTile')) count++;
                }
            }
        }
        
        console.log(`Flags: ${count}, Expected: ${mine_matrix[i][j]}, Match: ${count == mine_matrix[i][j]}`);
        if(count == mine_matrix[i][j]) {
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    const nx = i + dx;
                    const ny = j + dy;
                    if (nx >= 0 && nx < dimension && ny >= 0 && ny < dimension) {
                        if (!(tiles[nx][ny].classList.contains('flaggedTile')))revealTile(nx,ny);
                    }
                }
            }
        }
    }

    function updateFlags() {
        let digit1 = '';
        let digit2 = '';
        let digit3 = '';
        if (mines-flags >= 0) {
            digit1 = Math.floor((mines-flags) / 100) % 10;
            digit2 = Math.floor((mines-flags) / 10) % 10;
            digit3 = (mines-flags) % 10;
        } else {
            digit1 = '-neg';
            digit2 = Math.floor(Math.abs(mines-flags) / 10) % 10;
            digit3 = Math.abs(mines-flags) % 10;
        }
        
        windowEl.querySelector('#flags1').src = `media/mine-time${digit1}.png`;
        windowEl.querySelector('#flags2').src = `media/mine-time${digit2}.png`;
        windowEl.querySelector('#flags3').src = `media/mine-time${digit3}.png`;
    }

    function resetGame() {
        gameover = false;
        tilesRevealed = 0;
        flags = 0;

        // reset face
        windowEl.querySelector('#dude').src = 'media/play.png';

        // stop + reset timer
        stopTimer();
        seconds = 0;
        windowEl.querySelector('#timer1').src = 'media/mine-time0.png';
        windowEl.querySelector('#timer2').src = 'media/mine-time0.png';
        windowEl.querySelector('#timer3').src = 'media/mine-time0.png';

        // reset flags
        windowEl.querySelector('#flags1').src = 'media/mine-time0.png';
        windowEl.querySelector('#flags2').src = 'media/mine-time0.png';
        windowEl.querySelector('#flags3').src = 'media/mine-time0.png';

        // clear grid
        gridContainer.innerHTML = '';
        updateFlags();

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
                    if (tile.classList.contains('revealedTile')) {
                        chordCheck(i, j);
                    }
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
                tile.addEventListener('auxclick', e => {
                    e.preventDefault();

                    if (tile.classList.contains('revealedTile')) {
                        chordCheck(i, j);
                    }
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
            let icon = Math.floor(Math.random() * (dimension * dimension));
            while (mine_matrix[Math.floor(icon / dimension)][icon % dimension] != null) {
                icon = Math.floor(Math.random() * (dimension * dimension));
            }
            mine_matrix[Math.floor(icon / dimension)][icon % dimension] = -1;
        }

        // recalc numbers andre you stink doo doo
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
    }


    function revealTile(row, col) {
        // bounds check
        console.log(`Revealing ${row},${col}`);
        if (row < 0 || row >= dimension || col < 0 || col >= dimension) return;
        while (tilesRevealed == 0 && mine_matrix[row][col] != 0) {
            resetGame();
        }
        if (tilesRevealed == 0) {
            startTimer();
        }

        const tile = tiles[row][col];
        // stop recursion
        if (tile.classList.contains('revealedTile')) return;
        if (tile.classList.contains('flaggedTile')) return;

        tile.classList.add('revealedTile');
        const value = mine_matrix[row][col];
        tile.dataset.mineCount = value;

        if (value === -1) {
            tile.innerHTML = '<img src="media/mineOG.png" style="width:20px; height:20px;" draggable="false">';
            windowEl.querySelector('#dude').src = 'media/lose.png'
            gameover = true;
            stopTimer();
            return;
        }

        tilesRevealed++;

        if (tilesRevealed === dimension * dimension - 10) {
            windowEl.querySelector('#dude').src = 'media/win.png'
            gameover = true;
            stopTimer();
        }

        if (value > 0) {
            tile.textContent = value;
            tile.innerHTML = `<img src="media/mineNum${value}.png" style="width:20px; height:20px;" draggable="false">`;
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

    function updateTimer() {
        seconds++;
        const digit1 = Math.floor(seconds / 100) % 10;
        const digit2 = Math.floor(seconds / 10) % 10;
        const digit3 = seconds % 10;
        
        windowEl.querySelector('#timer1').src = `media/mine-time${digit1}.png`;
        windowEl.querySelector('#timer2').src = `media/mine-time${digit2}.png`;
        windowEl.querySelector('#timer3').src = `media/mine-time${digit3}.png`;
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

    // tiles surrounding check code is used twice
    updateFlags();
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            const tile = document.createElement('div');
            tile.classList.add('start', 'minetile');
            tile.dataset.row = i;
            tile.dataset.col = j;
            tile.addEventListener('click', () => {
                if (gameover) return;
                revealTile(i, j);
                if (tile.classList.contains('revealedTile')) {
                    chordCheck(i, j);
                }
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
            tile.addEventListener('auxclick', e => {
                e.preventDefault();

                if (tile.classList.contains('revealedTile')) {
                    chordCheck(i, j);
                }
            });
            gridContainer.appendChild(tile);
            tiles[i][j] = tile;
        }
    }

    for (let i=0; i<10; i++) {
        let icon = Math.floor(Math.random() * (dimension*dimension));
        while (mine_matrix[Math.floor(icon/dimension)][icon%dimension] != null) {
            icon = Math.floor(Math.random() * (dimension*dimension));
        }
        mine_matrix[Math.floor(icon/dimension)][icon%dimension] = -1;
    }
    
    //yo this one 100% real (not ai) you can tell cuz its peak
    for (let i=0; i<dimension; i++) {
        for (let j=0; j<dimension; j++) {
            if (mine_matrix[i][j] != -1) {
                let count = 0;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        const nx = i + dx;
                        const ny = j + dy;
                        if (nx >= 0 && nx < dimension && ny >= 0 && ny < dimension) {
                            if (mine_matrix[nx][ny] == -1) count++;
                        }
                    }
                }
                mine_matrix[i][j]=count;
            }
        }
    }
    windowEl.querySelector('.smile').addEventListener('click', () => {
        resetGame();
        updateFlags();
    });
    console.log(gridContainer);
}

let topZ = 10;

function initWindow(win) {
    // drag logic, .cls listener, .max listener, etc.
    win.querySelectorAll('.cls').forEach(btn => {
        btn.addEventListener('click', () => {
            const win = btn.closest('.window-98');

            if (win._taskbarBtn) win._taskbarBtn.remove();

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

    win.querySelectorAll('.max').forEach(btn => {
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

    win.querySelectorAll('.taskbar-window').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.taskbar-window').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const windowId = btn.dataset.windowId;
            const win = document.querySelector(`.${windowId}`);
            if (win) {
                topZ++;
                win.style.zIndex = topZ;
            }
        });
    });

    topZ++;
    win.style.zIndex = topZ++;
    
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const header = win.querySelector('.window-header') || win;

    header.style.cursor = 'move';
    header.addEventListener('pointerdown', e => {
        e.preventDefault(); //prevents text and image highlighting while dragging
        isDragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
    });
    win.addEventListener('pointerdown', e => {
        e.preventDefault();
        topZ++;
        win.style.zIndex = topZ;

        //fix selected win in taskbar
        document.querySelectorAll('.taskbar-window').forEach(b => b.classList.remove('active'));
        if (win._taskbarBtn) {
            document.querySelectorAll('.taskbar-window').forEach(b => b.classList.remove('active'));
            win._taskbarBtn.classList.add('active');
        }
    })

    // keep window movement bounded to t-container
    document.addEventListener('pointermove', e => {
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

    document.addEventListener('pointerup', () => isDragging = false);
}

setInterval(updateClock, 1000);
updateClock(); // run once on load

document.querySelectorAll('.window-98').forEach(initWindow);

// it may be more efficient to store the instance of the window and almost definitely is more efficient to store the desktop icon 
// instance as the icons are static and will never become null, thus making one call inside the constructor would save having

// The Window class stores the names of the html classes related to each window and the method that is called when resolving 
// a dblclick event on a desktop icon

class Window {
    constructor(desktopInstance, windowInstance, template, taskbarTemplate) {
        this._desktopInstance = desktopInstance;
        this._windowInstance = windowInstance;
        this._template = template;
        this._taskbarTemplate = taskbarTemplate;
    }
    // _desktopInstance is the class name of a given window type
    get desktop() {
        return this._desktopInstance;
    }
    // _windowInstance is the class name of a given window type
    get window() {
        return this._windowInstance;
    }
    // _template is name of the template of the given window type, the template stores only the data required to make the window
    get template() {
        return this._template;
    }
    // _taskbarTemplate is name of the template of the given taskbar button, the template stores only the data required to 
    // make the button
    get taskbar() {
        return this._taskbarTemplate;
    }

    // static method that will create a window and taskbar instance of a given window type, called through an eventlistener
    // on the desktopApp class of divs, pulls classes from WindowList for templates and for checking if there are
    // already opened windows of a given type... nix that just remove the desktopInstance param, its completely unneccesary,
    // check window for minesweeper check instead

    doubleClickHandler(desktopApp) {
        console.log('existing window?', document.querySelector(this._windowInstance));
        console.log('icon match?', desktopApp.querySelector(this._desktopInstance));

        if (document.querySelector(this._windowInstance)) return;
        if (!desktopApp.querySelector(this._desktopInstance)) return; //shouldnt need to check as this method only runs after a desktop icon is clicked?

        //initialize a clone from the template of the minesweeper window
        const clone = document.getElementById(this._template).content.cloneNode(true); //template
        const win = clone.querySelector('.window-98');
        
        //add class to check in future for existence of window
        win.classList.add(this._windowInstance.slice(1)); //window instance 

        //actually place the taskbar tab
        document.querySelector('.t-container').appendChild(clone);

        //initialize the event handling
        initWindow(document.querySelector(this._windowInstance)); //window instance
        if (this._desktopInstance == '.minesweeper-icon') {
            console.log("pee pee");
            initMinesweeper(document.querySelector('.minesweeper-window')) //special init for minesweeper
        }

        //for adding minesweeper to taskbar
        const taskbarClone = document.getElementById(this._taskbarTemplate).content.cloneNode(true); //taskbar template
        document.querySelector('.taskbar-window-container').appendChild(taskbarClone); 

        const winEl = document.querySelector(this._windowInstance); //window instance
        const btn = document.querySelector('.taskbar-window-container').lastElementChild;
        winEl._taskbarBtn = btn;
        btn.addEventListener('click', e => {
            e.preventDefault();
            document.querySelectorAll('.taskbar-window').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            topZ++;
            winEl.style.zIndex = topZ;
        });
    }

}

document.querySelectorAll('.desktop-app').forEach(desktopApp => {
    desktopApp.addEventListener('dblclick', e => {
        if (desktopApp.querySelector('.minesweeper-icon')) {
            minesweeperWindow.doubleClickHandler(desktopApp);
        }
        if (desktopApp.querySelector('.explorer-icon')) {
            explorerWindow.doubleClickHandler(desktopApp);
        }
        if (desktopApp.querySelector('.about-icon')) {
            aboutWindow.doubleClickHandler(desktopApp);
        }
        for (let i=0; i<WindowList.length; i++) {
            if (desktopApp.querySelector)
            WindowList[i].window().doubleClickHandler(desktopApp)
        }
    });
    desktopApp.addEventListener('pointerdown', e => {
        e.preventDefault();
    });
});

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

const minesweeperWindow = new Window('.minesweeper-icon', '.minesweeper-window' , 'minesweeper-template', 'minesweeper-taskbar-template');
const explorerWindow = new Window('.explorer-icon', '.explorer-window' , 'explorer-template', 'explorer-taskbar-template');
const aboutWindow = new Window('.about-icon', '.about-window' , 'about-template', 'about-taskbar-template');

const WindowList = [];
WindowList.appendChild(minesweeperWindow);
WindowList.appendChild(explorerWindow);
WindowList.appendChild(aboutWindow);