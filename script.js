//variables
let n = 0;
let initialState = [];
let finalState = null;
let fixed = [];
let cells = [];

//configs
let delay = 300;
let paused = false;

//functions
function clearApp() {
  document.getElementById("app").innerHTML = "";
}

function createElement(tag, text, className) {
  const el = document.createElement(tag);
  if (text) el.innerText = text;
  if (className) el.className = className;
  return el;
}

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