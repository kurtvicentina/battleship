import {
  playerTurn,
  currentAttacker,
  currentBoard,
  currentAttackerBoard,
  loadScreen,
} from "./game.js";

const body = document.querySelector("body");
const boardTitle = document.querySelector(".board-title");
const attackerTitle = document.querySelector(".attacker-title");
const annnouncement = document.querySelector("#announcement");

const showAttackerBoardButton = document.querySelector(
  "#showAttackerBoardButton",
);
const showEnemyBoardButton = document.querySelector("#showEnemyBoardButton");

showAttackerBoardButton.addEventListener("click", showAttackerBoard);
showEnemyBoardButton.addEventListener("click", showEnemyBoard);

const friendButton = document.querySelector("#friendButton");
const computerButton = document.querySelector("#computerButton");

function showAttackerBoard() {
  const allCoor = [];
  for (let ship in currentAttacker.allShipsCoordinates) {
    allCoor.push(ship);
  }

  for (let coor of allCoor) {
    const occupied = currentAttackerBoard.querySelector(
      `[data-tile-coor="${coor}"]`,
    );
    occupied.classList.add("tile-occupied");
  }
  const allTilesOfAttacker =
    currentAttackerBoard.querySelectorAll(".board-coordinate");

  for (let tile of allTilesOfAttacker) {
    tile.classList.add("disable");
  }

  hideBoard(currentBoard);
  showBoard(currentAttackerBoard);

  boardTitle.textContent = `Shown board Player ${currentAttackerBoard.dataset.boardNum}'s Board`;
}

function showEnemyBoard() {
  hideBoard(currentAttackerBoard);
  hideShips(currentBoard);
  changeBoardTitle();
}

function hideBoard(board) {
  board.classList.add("hide");
  annnouncement.textContent = "";
}

function showBoard(board) {
  board.classList.remove("hide");
  board.classList.add("show");
}

function hideShips(board) {
  board.classList.remove("hide");
  board.classList.add("show");
  const occupiedTiles = board.querySelectorAll(".tile-occupied");

  for (let tile of occupiedTiles) {
    tile.classList.remove("tile-occupied");
  }
}

function changeBoardTitle() {
  boardTitle.textContent = `Shown board Player ${currentBoard.dataset.boardNum}'s Board`;
}

function createDomBoard(playerNum) {
  const newBoard = document.createElement("div");
  newBoard.classList.add("board-container");
  newBoard.dataset.boardNum = playerNum;
  body.append(newBoard);

  return newBoard;
}

function createTiles(player, board) {
  for (let i = 0; i < 8; i++) {
    for (let k = 0; k < 8; k++) {
      let newTile = document.createElement("div");
      newTile.classList.add("board-coordinate");
      newTile.dataset.tileCoor = `${i}, ${k}`;
      newTile.addEventListener("click", (e) => {
        if (player === currentAttacker) return;
        if (
          e.target.classList.contains("tile-miss") ||
          e.target.classList.contains("tile-hit")
        )
          return;

        hitShipOnDom(e.target, player.receiveAttack(i, k));
        hideShips(currentBoard);
        playerTurn(currentAttacker);
        changeBoardTitle();
        player.allShipsAreSunk();
      });

      board.append(newTile);
    }
  }
}

function hitShipOnDom(tile, attack) {
  if (attack == true) {
    tile.classList.add("tile-hit", "disable");
    annnouncement.textContent = "You hit an enemy ship";
    return;
  } else {
    tile.classList.add("tile-miss", "disable");
    annnouncement.textContent = "You missed";
    return;
  }
}

function showWinner() {
  currentAttackerBoard.style.display = "none";
  currentBoard.style.display = "none";
  showAttackerBoardButton.style.display = "none";
  showEnemyBoardButton.style.display = "none";
  boardTitle.style.display = "none";
  attackerTitle.style.display = "none";
  const winnerContainer = document.createElement("div");
  winnerContainer.classList.add("winner-container");
  const winnerText = document.createElement("h1");

  winnerText.textContent = `Congratulations! Winner is Player ${currentAttackerBoard.dataset.boardNum}`;

  winnerContainer.append(winnerText);

  const restartButton = document.createElement("button");
  restartButton.type = "button";

  restartButton.textContent = "Restart Game";
  restartButton.addEventListener("click", () => {
    winnerContainer.remove();
    loadScreen();
  });

  winnerContainer.append(restartButton);

  body.append(winnerContainer);
}

export {
  createDomBoard,
  createTiles,
  hitShipOnDom,
  hideShips,
  hideBoard,
  boardTitle,
  showAttackerBoard,
  attackerTitle,
  changeBoardTitle,
  showWinner,
  showAttackerBoardButton,
  showEnemyBoardButton,
  friendButton,
  computerButton,
};
