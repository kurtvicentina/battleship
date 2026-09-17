import { player, computerMove } from "./battleship.js";
import {
  createTiles,
  createDomBoard,
  hideShips,
  hideBoard,
  boardTitle,
  attackerTitle,
  changeBoardTitle,
  showAttackerBoardButton,
  showEnemyBoardButton,
  friendButton,
  computerButton,
  annnouncement,
  battleshipImg,
  shipContainer,
  annnouncementContainer,
} from "./domMethods.js";

const preDeterminedCoordinates = [
  [0, 0, 2],
  [0, 3, 3],
  [0, 7, 2],
  [4, 7, 3],
  [5, 1, 4],
  [7, 0, 6],

  [0, 1, 2],
  [2, 3, 3],
  [0, 6, 2],
  [4, 5, 3],
  [3, 1, 4],
  [7, 0, 6],
];

let currentAttacker;
let currentlyBombed;
let currentBoard;
let currentAttackerBoard;
let player1;
let player2;
let player1Board;
let player2Board;

let computer;
let computerBoard;

function loadScreen() {
  showAttackerBoardButton.style.display = "none";
  showEnemyBoardButton.style.display = "none";
  shipContainer.style.display = "none";
  annnouncement.style.display = "none";
  battleshipImg.style.display = "block";
  friendButton.addEventListener("click", getShips);
  computerButton.addEventListener("click", computerGameStart);

  friendButton.style.display = "block";
  computerButton.style.display = "block";
}

function endGame(cBombed) {
  if (cBombed.allShipsAreSunk(cBombed.allShips)) return true;

  return false;
}

function getShips() {
  friendButton.style.display = "none";
  computerButton.style.display = "none";
  battleshipImg.style.display = "none";
  annnouncement.style.display = "none";
  boardTitle.style.display = "block";
  attackerTitle.style.display = "none";
  shipContainer.style.display = "flex";
  showAttackerBoardButton.style.display = "none";
  showEnemyBoardButton.style.display = "none";
  player1 = player();
  player2 = player();

  player1Board = createDomBoard(1);
  player2Board = createDomBoard(2);

  const lockInButton = document.createElement("button");
  lockInButton.classList.add("button", "lock-in-button");
  lockInButton.textContent = "Lock in ships";

  boardTitle.textContent = "Player 1, place your ships";
  annnouncementContainer.append(lockInButton);
  player2Board.style.display = "none";

  createTiles(player1, player1Board, playerTurnWithPlayer);
  createTiles(player2, player2Board, playerTurnWithPlayer);
}

function gameStart() {
  friendButton.style.display = "none";
  computerButton.style.display = "none";
  battleshipImg.style.display = "none";
  annnouncement.style.display = "block";
  boardTitle.style.display = "block";
  attackerTitle.style.display = "block";
  shipContainer.style.display = "flex";
  showAttackerBoardButton.style.display = "block";
  showEnemyBoardButton.style.display = "block";
  player1 = player();
  player2 = player();

  player1Board = createDomBoard(1);
  player2Board = createDomBoard(2);

  createTiles(player1, player1Board, playerTurnWithPlayer);
  createTiles(player2, player2Board, playerTurnWithPlayer);
  // player1.placeShipHorizontal(1, 7, 2);
  // player1.placeShipHorizontal(preDeterminedCoordinates[1])
  // player1.placeShipVertical(preDeterminedCoordinates[2])
  // player1.placeShipVertical(preDeterminedCoordinates[3])
  // player1.placeShipHorizontal(preDeterminedCoordinates[4])
  // player1.placeShipVertical(preDeterminedCoordinates[5])

  // player2.placeShipHorizontal(0, 1, 2);
  // player2.placeShipVertical(2, 3, 3, 2);
  // player2.placeShipHorizontal(0, 6, 2, 2);
  // player2.placeShipHorizontal(4, 5, 3, 2);
  // player2.placeShipVertical(3, 1, 4, 2);
  // player2.placeShipVertical(7, 0, 6, 2);

  attackerTitle.textContent = `Attacker is Player 1`;
  currentAttacker = player1;
  currentlyBombed = player2;
  currentAttackerBoard = player1Board;
  currentBoard = player2Board;

  hideBoard(player1Board);
  hideShips(player2Board);

  changeBoardTitle();
}

function computerGameStart() {
  friendButton.style.display = "none";
  computerButton.style.display = "none";
  battleshipImg.style.display = "none";
  annnouncement.style.display = "block";
  boardTitle.style.display = "block";
  attackerTitle.style.display = "block";
  showAttackerBoardButton.style.display = "block";
  showEnemyBoardButton.style.display = "block";

  player1 = player();
  computer = player();

  player1Board = createDomBoard(1);
  computerBoard = createDomBoard(3);

  createTiles(player1, player1Board, playerTurnWithComputer);
  createTiles(computer, computerBoard, playerTurnWithComputer);

  player1.placeShipVertical(0, 0, 2);
  player1.placeShipVertical(0, 3, 3);

  computer.placeShipHorizontal(0, 1, 2);

  attackerTitle.textContent = `Attacker is Player 1`;
  currentAttacker = player1;
  currentlyBombed = computer;
  currentAttackerBoard = player1Board;
  currentBoard = computerBoard;

  hideBoard(player1Board);
  hideShips(computerBoard);

  changeBoardTitle();
}

function changeTurn(currAttackerBoard, currBoard) {
  hideBoard(currAttackerBoard);
  hideShips(currBoard);
  currentAttackerBoard = currAttackerBoard;
  currentBoard = currBoard;
  changeBoardTitle();
}

function playerTurnWithPlayer(cAttacker) {
  if (cAttacker == player1) {
    if (endGame(currentlyBombed)) return;
    setTimeout(() => {
      changeTurn(player2Board, player1Board);
      attackerTitle.textContent = "Attacker is Player 2";
    }, 2000);
    currentAttacker = player2;
    currentlyBombed = player1;
  }
  if (cAttacker == player2) {
    if (endGame(currentlyBombed)) return;
    setTimeout(() => {
      changeTurn(player1Board, player2Board);
      attackerTitle.textContent = "Attacker is Player 1";
    }, 2000);
    currentAttacker = player1;
    currentlyBombed = player2;
  }
}

function playerTurnWithComputer(cAttacker) {
  if (cAttacker == player1) {
    currentAttacker = computer;
    currentlyBombed = player1;
    if (endGame(currentlyBombed)) return;
    setTimeout(() => {
      changeTurn(computerBoard, player1Board);
      attackerTitle.textContent = `Attacker is the Computer`;
      // setTimeout(() => {
      let compMove = computerMove();
      let target = player1Board.querySelector(`[data-tile-coor="${compMove}"]`);
      target.click();
      // }, 200);
    }, 2000);
  }

  if (cAttacker == computer) {
    if (endGame(currentlyBombed)) return;
    setTimeout(() => {
      changeTurn(player1Board, computerBoard);
      attackerTitle.textContent = `Attacker is Player 1`;
      return;
    }, 2000);
    currentAttacker = player1;
    currentlyBombed = computer;
  }
}
loadScreen();

function playerPlaceShips() {}

export {
  playerTurnWithComputer,
  playerTurnWithPlayer,
  currentAttacker,
  currentBoard,
  currentAttackerBoard,
  gameStart,
  loadScreen,
};
