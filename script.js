//variables
let n = 0;
let initialState = [];
let finalState = null;
let fixed = [];
let cells = [];

//configs
let delay = 300;
let paused = false;

//clear/create HTML elements
function clearApp() {
  document.getElementById("app").innerHTML = "";
}
function createElement(tag, text, className) {
  const el = document.createElement(tag);
  if (text) el.innerText = text;
  if (className) el.className = className;
  return el;
}

//generating chess board
function createBoard(N) {
  const boardContainer = document.getElementById("boardContainer");
  boardContainer.innerHTML = "";
  boardContainer.style.display = "grid";
  boardContainer.style.gridTemplateColumns = `repeat(${N}, 60px)`;
  boardContainer.style.width = `${N * 60}px`;
  boardContainer.style.height = `${N * 60}px`;
  boardContainer.className = "board";
  
  cells = [];
  for (let r = 0; r < N; r++) {
    let rowArray = [];
    for (let c = 0; c < N; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      //colors
      cell.style.backgroundColor = ((r + c) % 2 === 0) ? "#ebecd0" : "#789454";
      boardContainer.appendChild(cell);
      rowArray.push(cell);
    }
    cells.push(rowArray);
  }
}
function updateBoardDisplay(state) {
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const cell = cells[r][c];
      cell.style.backgroundColor = ((r + c) % 2 === 0) ? "#ebecd0" : "#789454";
      cell.innerHTML = "";
    }
    if (state[r] !== -1) {
      const col = state[r];
      const cell = cells[r][col];
      const queenImg = document.createElement("img");
      queenImg.src = "queen.png";
      queenImg.alt = "Queen";
      cell.appendChild(queenImg);
    }
  }
}

//backtracking algorithm
async function backtrack(state, row, N) {
  if (row >= N) {
    alert("Problem Solved");
    return true;
  }
  
  for (let col = 0; col < N; col++) {
    const cell = cells[row][col];
    const originalColor = ((row + col) % 2 === 0) ? "#ebecd0" : "#789454";
    cell.style.backgroundColor = "yellow"; //checking square becomes yellow
    await sleepWithPause(delay);
    
    if (isSafe(state, row, col)) {
      state[row] = col;
      updateBoardDisplay(state);
      cell.style.backgroundColor = originalColor;
      await sleepWithPause(delay);
      
      if (await backtrack(state, row + 1, N)) return true;
      
      cell.style.backgroundColor = "red"; //red square when removing queen
      await sleepWithPause(delay);
      state[row] = -1;
      updateBoardDisplay(state);
      cell.style.backgroundColor = originalColor;
      await sleepWithPause(delay);
    } else {
      cell.style.backgroundColor = originalColor;
    }
  }
  return false;
}

//checking for valid queen placement
function isSafe(state, row, col) {
  for (let i = 0; i < row; i++) {
    if (state[i] === col || Math.abs(state[i] - col) === Math.abs(i - row)) {
      return false;
    }
  }
  return true;
}

//pause/resume
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleepWithPause(ms) {
  let elapsed = 0;
  while (elapsed < ms) {
    if (paused) {
      await sleep(50);
    } else {
      let delta = Math.min(50, ms - elapsed);
      await sleep(delta);
      elapsed += delta;
    }
  }
}
function togglePause() {
  paused = !paused;
  const pauseButton = document.getElementById("pauseButton");
  if (pauseButton) {
    pauseButton.textContent = paused ? "Resume" : "Pause";
  }
}