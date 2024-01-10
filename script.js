const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //   empty everything on UI
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    // missed thing
    box.classList.remove("win");
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `current player: ${currentPlayer}`;
}

initGame();

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    // swap turn
    swapTurn();
    // make sure the game is not over yet
    checkGameOver();
  }
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `current player: ${currentPlayer}`;
}

newGameBtn.addEventListener("click", initGame);

function checkGameOver() {
  let ans = "";

  winningPositions.forEach((position) => {
    // all 3 boxes must be of same value with non-empty value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // find winner
      if (gameGrid[position[0]] === "X") {
        ans = "X";
      } else {
        ans = "O";
      }
      // now we know the winner
      //   disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  if (ans !== "") {
    // means we have a winner
    gameInfo.innerText = `winner is: ${ans}`;
    newGameBtn.classList.add("active");
    return;
  }

  //   when game is Tie
  let fillCnt = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillCnt++;
    }
  });

  // grid is full (Tie)
  if (fillCnt === 9) {
    gameInfo.innerText = `Game Tied!`;
    newGameBtn.classList.add("active");
  }
}
