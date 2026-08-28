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
} from "./domMethods.js";

let currentAttacker;
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
  friendButton.addEventListener("click", gameStart);
  computerButton.addEventListener("click", computerGameStart);

  friendButton.style.display = "block";
  computerButton.style.display = "block";
}

function gameStart() {
  boardTitle.style.display = "block";
  attackerTitle.style.display = "block";
  showAttackerBoardButton.style.display = "block";
  showEnemyBoardButton.style.display = "block";
  player1 = player();
  player2 = player();

  player1Board = createDomBoard(1);
  player2Board = createDomBoard(2);

  createTiles(player1, player1Board);
  createTiles(player2, player2Board);

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
  currentAttackerBoard = player1Board;
  currentBoard = player2Board;
  currentAttackerBoard.style.display = "none";

  hideBoard(player1Board);
  hideShips(player2Board);

  friendButton.style.display = "none";
  changeBoardTitle();
}

function computerGameStart() {
  boardTitle.style.display = "block";
  attackerTitle.style.display = "block";
  showAttackerBoardButton.style.display = "block";
  showEnemyBoardButton.style.display = "block";

  player1 = player();
  computer = player();

  player1Board = createDomBoard(1);
  computerBoard = createDomBoard(3);

  createTiles(player1, player1Board);
  createTiles(computer, computerBoard);

  player1.placeShipVertical(0, 0, 2, 1);
  player1.placeShipVertical(0, 3, 3, 1);

  computer.placeShipHorizontal(0, 1, 2, 3);

  // attackerTitle.textContent = `Attacker is Player 1`;
  currentAttacker = player1;
  currentAttackerBoard = player1Board;
  currentBoard = computerBoard;
  // currentAttackerBoard.style.display = "none";

  hideBoard(player1Board);
  hideShips(computerBoard);

  computerButton.style.display = "none";
  changeBoardTitle();
}

function changeTurn(currAttackerBoard, currBoard) {
  hideBoard(currAttackerBoard);
  hideShips(currBoard);
  currentAttackerBoard = currAttackerBoard;
  currentBoard = currBoard;
  changeBoardTitle();
  // attackerTitle.textContent = `Attacker is Player 2`;
}

function playerTurn(cAttacker) {
  if (cAttacker == player1) {
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
  }
  if (cAttacker == player2) {
    setTimeout(() => {
      hideBoard(player1Board);
      hideShips(player2Board);
      currentAttacker = player1;
      currentAttackerBoard = player1Board;
      currentBoard = player2Board;
      changeBoardTitle();
      attackerTitle.textContent = `Attacker is Player 1`;
      return;
    }, 2000);
  }

  if (cAttacker == computer) {
    setTimeout(() => {
      changeTurn(player1Board, computerBoard);
      return;
    }, 2000);
    currentAttacker = player1;
  }
}

loadScreen();

export {
  playerTurn,
  currentAttacker,
  currentBoard,
  currentAttackerBoard,
  gameStart,
  loadScreen,
};
