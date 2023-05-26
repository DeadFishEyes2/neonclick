const toggleMinigame = document.getElementById("minigame-button");

      const startMinigame = document.getElementById("minigame-start-button");
      const netrunCover = document.getElementById("netrun-cover");
      const canvas = document.getElementById("room");
      const ctx = canvas.getContext("2d");

//drawing the nett

toggleMinigame.addEventListener("click", ()=>{
        document.getElementById("minigame").style.display = 'block';
        toggleMinigame.style.display = "none";

let maxNumberOfWindows = 10;
let gameTime = 15000;
let gameCooldown = 60000;
let earnings = 0;

function calculateProbability(){
  redProbability = (1 - greenProbability) / 2;
  greyProbability = (1 - greenProbability) / 2;
}

var greenProbability = 0.5; // Adjust this value to manipulate the probability of a green window
var redProbability;
var greyProbability;
calculateProbability();


function calculateProbability(){
  redProbability = (1 - greenProbability) / 2;
  greyProbability = (1 - greenProbability) / 2;
}

var greenProbability = 0.5; // Adjust this value to manipulate the probability of a green window
var redProbability;
var greyProbability;
calculateProbability();


startMinigame.addEventListener("click", () => {
  if (gameCooldown == 0){
    netrunCover.style.display = "none";
    for (let i = 1; i <= 11; i++)
            earnings += buildingIncome[i];
    setTimeout(()=>{
      netrunCover.style.display = "block";
      gameCooldown = 60000;
    }, gameTime);
  }
});

setInterval(()=>{
  if (gameCooldown > 0){
    gameCooldown -= 1000;
    document.getElementById("minigame-timer").innerHTML = gameCooldown/1000 + 's';
  } else {
    document.getElementById("minigame-timer").innerHTML = "Ready";
  }
},1000);

const squareSize = 50;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let i = centerX - squareSize/2;
let j = i / 3 * 2;
let k = i / 3;

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#141517';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "Black";
  ctx.fillRect(
    centerX - squareSize / 2,
    centerY - squareSize / 2,
    squareSize,
    squareSize
  );
    ctx.strokeStyle = "yellow";
    ctx.moveTo(0,0);
    ctx.lineTo(0,canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(0, 0);
    ctx.lineTo(centerX - squareSize/2, centerY - squareSize/2);
    ctx.lineTo(centerX - squareSize/2, centerY + squareSize/2);
    ctx.lineTo(0,canvas.height);
    ctx.moveTo(centerX - squareSize/2, centerY + squareSize/2);
    ctx.lineTo(centerX + squareSize/2, centerY + squareSize/2);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.moveTo(centerX + squareSize/2, centerY + squareSize/2);
    ctx.lineTo(centerX + squareSize/2, centerY - squareSize/2);
    ctx.lineTo(canvas.width, 0);
    ctx.moveTo(centerX + squareSize/2, centerY - squareSize/2);
    ctx.lineTo(centerX - squareSize/2, centerY - squareSize/2);
    ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(i,i);
  ctx.lineTo(canvas.width - i, i);
  ctx.lineTo(canvas.width - i, canvas.height-i);
  ctx.lineTo(i, canvas.height-i);
  ctx.lineTo(i,i);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(j,j);
  ctx.lineTo(canvas.width - j, j);
  ctx.lineTo(canvas.width - j, canvas.height - j);
  ctx.lineTo(j, canvas.height - j);
  ctx.lineTo(j, j);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(k,k);
  ctx.lineTo(canvas.width - k, k);
  ctx.lineTo(canvas.width - k, canvas.height - k);
  ctx.lineTo(k, canvas.height - k);
  ctx.lineTo(k, k);
  ctx.stroke();
  
  i--;
  j--;
  k--;
  if (i <= 0) {
    i = centerX - squareSize/2;
  }
  if (j <= 0) {
    j = centerX - squareSize/2;
  }
  if (k <= 0) {
    k = centerX - squareSize/2;
  }
};

const interval = setInterval(draw, 13);

//windows appearance and control
let r_box = 0;
let g_box = 0;

var audioPop = new Audio("assets/pop_sound.mp3");
var audioError = new Audio("assets/error_sound.mp3");    


const nett = document.querySelector(".nett");
    const windowCount = maxNumberOfWindows;
    const windows = [];

    const randomPosition = () => {
      const x = Math.floor(Math.random() * (nett.offsetWidth - 50));
      const y = Math.floor(Math.random() * (nett.offsetHeight - 80));
      return { x, y };
    };

    const randomInterval = () => Math.floor(Math.random() * 50) + 100;

    for (let index = 0; index < windowCount; index++) {
      const window = document.createElement("div");
      window.classList.add("window");
      const position = randomPosition();
      window.style.left = `${position.x}px`;
      window.style.top = `${position.y}px`;
      windows.push(window);
      nett.appendChild(window);
      
      window.addEventListener("click", () => {
        if (window.style.backgroundImage === 'url("assets/red_window.png")') {
          audioError.play();
          if (numPoints - (earnings/10*2) >= 0)
            numPoints -= (earnings/10*2);
          else 
            numPoints = 0;
          points.innerHTML = convert(numPoints);
          window.style.display = 'none';
        }
      });
      window.addEventListener("click", (event) => {
        if (window.style.backgroundImage === 'url("assets/green_window.png")') {
          audioPop.play();
          let rect = canvas.getBoundingClientRect();
          numPoints += (earnings/10);
          points.innerHTML = convert(numPoints);
          /*
          ctx.beginPath();
          ctx.fillText("+50",event.clientX-rect.left, event.clientY-rect.top);
          ctx.stroke();
          */
          window.style.display = 'none';
        }
      });
    }

    let timeoutId;
    const showWindow = () => {
      const window = windows[Math.floor(Math.random() * windows.length)];

      window.style.backgroundImage =
        Math.random() < redProbability
          ? "url('assets/red_window.png')"
          : Math.random() < greyProbability
          ? "url('assets/grey_window.png')"
          : "url('assets/green_window.png')";
      window.style.display = "block";
      timeoutId = setTimeout(hideWindow, randomInterval() + 100);
    };

    const hideWindow = () => {
      const window = windows[Math.floor(Math.random() * windows.length)];
      window.style.display = "none";
      timeoutId = setTimeout(showWindow, randomInterval() + 100);
    };

    timeoutId = setTimeout(showWindow, randomInterval() + 100);

  });
