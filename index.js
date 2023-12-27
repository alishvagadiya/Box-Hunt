let startTime = 0;
// let startTime = Date.now();
let lastClick = 0;
let pauseGameFlag = 0;
let clickCount = 0;
let lastBox = false;
let popBoxNumber = -1;
let interval = 0;
let timeIntervalId = -1;
let inputValue = -1;
function resetGame() {
  document.getElementById("scoreTableBody").innerHTML = "";
  let removePopBox = document.getElementById(lastBox);
  removePopBox.className = removePopBox.className.split(" ")[0]; clearInterval(timeIntervalId);
  startTime = 0;
  lastClick = 0;
  pauseGameFlag = 0;
  clickCount = 0;
  lastBox = false;
  popBoxNumber = -1;
  interval = 3000;
  timeIntervalId = -1;

}
function addBoxes() {
  const boxContainer = document.getElementById("boxContainer");
  console.log(boxContainer);
  let boxContent = '';
  for (let index = 1; index <= 100; index++) {
    boxContent += '<div class="simpleBox" onclick="popClick(' + index + ')" id="box' + index + '">' + index + '</div>';
  }
  boxContainer.innerHTML = boxContent;
}
addBoxes();

function startGame() {
  interval = document.getElementById("intervalValue").value * 1000;
  console.log({ interval });
  startTime = Date.now();
  pauseGameFlag = 0;
  activePopBox();

  timeIntervalId = setInterval(() => {
    console.log(pauseGameFlag, interval, timeIntervalId)
    activePopBox();
  }, interval);
}
function pauseGame() {
  pauseGameFlag = 1;
  clearInterval(timeIntervalId);
}

function activePopBox() {
  console.log("active pop", pauseGameFlag, interval)
  if (lastBox) {
    let removePopBox = document.getElementById(lastBox);
    removePopBox.className = removePopBox.className.split(" ")[0];
  }
  let random = Math.ceil(Math.random() * 100);
  let selectedBox = document.getElementById("box" + random);
  let classList = selectedBox.className += " popBox";
  lastBox = "box" + random;
}

function popClick(param) {
  let boxData = document.getElementById("box" + param);
  let classlist = boxData.className.split(" ")
  if (classlist.length > 1) {
    const clickTime = (Date.now() - startTime) / 1000;
    clickCount++;
    let scoreBoard = document.getElementById("scoreTableBody");
    let newClick = "<div class='row'><div class='count'>" + clickCount + "</div><div class='count'>" + clickTime + "</div></div>";
    scoreBoard.innerHTML += newClick;
  } else {
    console.log("sorry")
  }
  startTime = Date.now();
}