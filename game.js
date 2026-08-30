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
} from "./domMethods.js";

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
  annnouncement.style.display = "none";
  friendButton.addEventListener("click", gameStart);
  computerButton.addEventListener("click", computerGameStart);

  friendButton.style.display = "block";
  computerButton.style.display = "block";
}

function endGame(cBombed) {
  if (cBombed.allShipsAreSunk(cBombed.allShips)) return true;

  return false;
}

function gameStart() {
  friendButton.style.display = "none";
  computerButton.style.display = "none";
  boardTitle.style.display = "block";
  attackerTitle.style.display = "block";
  showAttackerBoardButton.style.display = "block";
  showEnemyBoardButton.style.display = "block";
  player1 = player();
  player2 = player();

  player1Board = createDomBoard(1);
  player2Board = createDomBoard(2);

  createTiles(player1, player1Board, playerTurnWithPlayer);
  createTiles(player2, player2Board, playerTurnWithPlayer);

  player1.placeShipVertical(0, 0, 2, 1);
  player1.placeShipVertical(0, 3, 3, 1);
  // player1.placeShipHorizontal(0, 7, 2, 1);
  // player1.placeShipHorizontal(4, 7, 3, 1);
  // player1.placeShipVertical(5, 1, 4, 1);
  // player1.placeShipVertical(7, 0, 6, 1);

  player2.placeShipHorizontal(0, 1, 2, 2);
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

  player1.placeShipVertical(0, 0, 2, 1);
  player1.placeShipVertical(0, 3, 3, 1);

  computer.placeShipHorizontal(0, 1, 2, 3);

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
  attackerTitle.textContent = `Attacker is the Player 1`;
  if (cAttacker == player1) {
    if (endGame(currentlyBombed)) return;
    setTimeout(() => {
      changeTurn(player2Board, player1Board);
    }, 2000);
    currentAttacker = player2;
    currentlyBombed = player1;
  }
  if (cAttacker == player2) {
    setTimeout(() => {
      changeTurn(player1Board, player2Board);
      return;
    }, 2000);
    currentAttacker = player1;
    currentlyBombed = player2;
  }
}

function playerTurnWithComputer(cAttacker) {
  attackerTitle.textContent = `Attacker is the Computer`;
  if (cAttacker == player1) {
    if (endGame(currentlyBombed)) return;
    setTimeout(() => {
      changeTurn(computerBoard, player1Board);
      setTimeout(() => {
        let compMove = computerMove();
        let target = player1Board.querySelector(
          `[data-tile-coor="${compMove}"]`,
        );
        target.click();
      }, 1500);
    }, 2000);
    currentAttacker = computer;
    currentlyBombed = player1;
  }

  if (cAttacker == computer) {
    attackerTitle.textContent = `Attacker is Player 1`;
    if (endGame(currentlyBombed)) return;
    setTimeout(() => {
      changeTurn(player1Board, computerBoard);
      return;
    }, 2000);
    currentAttacker = player1;
    currentlyBombed = computer;
  }
}
loadScreen();

export {
  playerTurnWithComputer,
  playerTurnWithPlayer,
  currentAttacker,
  currentBoard,
  currentAttackerBoard,
  gameStart,
  loadScreen,
};
