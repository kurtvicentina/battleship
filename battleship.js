import { showWinner } from "./domMethods.js";

function ship(length) {
  let hitTimes = 0;
  let sunk = false;

  function shipLength() {
    return length;
  }

  function getHitTimes() {
    return hitTimes;
  }

  function hit() {
    hitTimes++;
  }

  function isSunk() {
    if (hitTimes >= length) {
      sunk = true;
      return sunk;
    }
    return sunk;
  }

  return {
    shipLength,
    getHitTimes,
    isSunk,
    hit,
  };
}

function gameBoard() {
  const allShipsCoordinates = {};
  const allShips = [];
  const allMissedAttacks = [];

  const boardLength = 7;

  function isOutOfBounds(coor) {
    if (
      coor[0] < 0 ||
      coor[0] > boardLength ||
      coor[1] < 0 ||
      coor[1] > boardLength
    ) {
      return true;
    }

    return false;
  }

  function isCoorOccupied(coor, length) {
    for (let i = 0; i < length; i++) {
      if (allShipsCoordinates[`${coor[0]}, ${coor[1]}`]) return true;
    }
    return false;
  }

  function placeShipHorizontal(x, y, length) {
    //x are the values horizontally, while y are the values vertically

    if (!isOutOfBounds([y, x + length]) && !isCoorOccupied([x, y], length)) {
      const newShip = ship(length);
      allShips.push(newShip);
      //check if out of bounds and if y and x coordinate is not occupied; it means y is the pivot and the x coordinate
      // increments so that the ship is placed horizontally
      for (let i = 0; i < length; i++) {
        allShipsCoordinates[`${y}, ${x}`] = newShip;
        x++;
      }
    }
  }

  function placeShipVertical(x, y, length) {
    if (!isOutOfBounds([x, y + length]) && !allShipsCoordinates[`${y}, ${x}`]) {
      const newShip = ship(length);
      allShips.push(newShip);
      for (let i = 0; i < length; i++) {
        allShipsCoordinates[`${y}, ${x}`] = newShip;
        y++;
      }
    }
  }

  function receiveAttack(x, y) {
    if (!allShipsCoordinates[`${x}, ${y}`]) {
      allMissedAttacks.push(`${x}, ${y}`);

      console.log("miss");

      return false;
    }

    console.log("hit");

    allShipsCoordinates[`${x}, ${y}`].hit();
    // allShipsAreSunk(allShips);
    return true;
  }

  function allShipsAreSunk(ships) {
    let allAreSunk = false;
    if (ships) {
      for (let ship of ships) {
        if (ship.isSunk() !== true) return allAreSunk;
      }
      allAreSunk = true;
      showWinner();

      return allAreSunk;
    }
    return allAreSunk;
  }

  return {
    allShips,
    allShipsCoordinates,
    placeShipHorizontal,
    placeShipVertical,
    isOutOfBounds,
    receiveAttack,
    allMissedAttacks,
    allShipsAreSunk,
  };
}

function player() {
  const newPlayerBoard = gameBoard();

  return newPlayerBoard;
}

const computerMadeMoves = [];

function computerMove() {
  function createMove() {
    const x = Math.floor(Math.random() * 8);
    const y = Math.floor(Math.random() * 8);

    return { x, y };
  }

  function validMove() {
    let makeMove = createMove();
    let newMove = `${makeMove.x}, ${makeMove.y}`;

    if (!computerMadeMoves[newMove]) {
      computerMadeMoves[newMove] = true;

      return newMove;
    }
    return validMove();
  }

  return validMove();
}

export { ship, gameBoard, player, computerMove };
