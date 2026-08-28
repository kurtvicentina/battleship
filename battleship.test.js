import { ship, gameBoard } from "./battleship";

// test("ship is returning its length", () => {
//   const newShip = ship(2);
//   expect(newShip.shipLength()).toBe(2);
// });

// test("ship hit function is correct", () => {
//   const newShip = ship(2);
//   newShip.hit();
//   expect(newShip.getHitTimes()).toBe(1);
// });

// test("sunk function is correct", () => {
//   const newShip = ship(2);
//   newShip.hit();
//   newShip.hit();

//   expect(newShip.isSunk()).toBe(true);
// });

// test("out of bounds function is correct", () => {
//   const board = gameBoard();
//   expect(board.isOutOfBounds([0, 5 + 2])).toBeFalsy();
// });

// test("place ship horizontal is correct", () => {
//   const board = gameBoard();
//   const place = board.placeShipHorizontal(0, 5, 2);

//   expect(board.occupiedX).toBe(0);
// });

// test("place ship vertical is correct", () => {
//   const board = gameBoard();
//   board.placeShipHorizontal(0, 0, 2);
//   board.placeShipVertical(5, 5, 2);
//   board.placeShipHorizontal(1, 1, 2);

//   console.log(board.allShips);
//   board.allShips["0, 2"].hit();
//   board.allShips["0, 2"].hit();
//   console.log(board.allShips["0, 2"].getHitTimes());
//   expect(board.allShips).toBe([{}]);
//   // expect(board.occupiedX).toBe(0);
// });

test("receive attack function is correct", () => {
  const board = gameBoard();
  board.placeShipVertical(0, 0, 2);
  board.receiveAttack(0, 1);
  board.receiveAttack(0, 0);

  console.log(board.allShips["0, 0"]);
  console.log(board.allReceivedAttacks);
  expect(board.allShips["0, 1"].isSunk()).toBeTruthy();
});
