import React, { useState } from 'react';
import Cell from '../Cell/Cell';
import styles from './Board.scss';

// TODO: Accept N as an input
//       decide which cells hold mines, and pass down isMine to cells as props
//       Pass down how many mines each sell is adjacent to

const initBoard = (N) =>
  Array.from(Array(N), () =>
    Array.from(Array(N), () => ({
      isMine: false,
      neighboringMines: 0,
      isShown: false,
    })),
  );

function placeMines(board, numberOfMines) {
  const minesCoordinates = [];
  while (minesCoordinates.length < numberOfMines) {
    const coordinate = generateRandomCoordinates(board.length);
    const coordinateString = JSON.stringify(coordinate);
    if (!minesCoordinates.includes(coordinateString)) {
      minesCoordinates.push(coordinateString);
      board[coordinate.x][coordinate.y].isMine = true;
      updateNeighbors(board, coordinate);
    }
  }
}

function generateRandomCoordinates(N) {
  const x = Math.floor(Math.random() * N);
  const y = Math.floor(Math.random() * N);
  return { x, y };
}

function updateNeighbors(board, coordinate) {
  const { x, y } = coordinate;
  for (let i = -1; i < 2; i++) {
    for (let j = 0 - 1; j < 2; j++) {
      try {
        board[x + i][y + j].neighboringMines += 1;
      } catch (e) {}
    }
  }
}

function Board() {
  const tempBoard = initBoard(5);
  placeMines(tempBoard, 3);
  const [board, setBoard] = useState(tempBoard);

  function clearNeighbors(coordinates, tempBoard) {
    const cellStack = [];
    cellStack.push(coordinates);
    while (cellStack.length > 0) {
      const curCoordinates = cellStack.pop();
      const x = curCoordinates.x;
      const y = curCoordinates.y;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          try {
            if (
              tempBoard[x + i][y + j].neighboringMines < 2 &&
              !tempBoard[x + i][y + j].isShown &&
              !tempBoard[x + i][y + j].isMine
            ) {
              tempBoard[x + i][y + j].isShown = true;
              cellStack.push({ x: x + i, y: y + j });
            }
          } catch (e) {}
        }
      }
    }
    setBoard(tempBoard);
  }

  function handleCellClick(coordinates) {
    const tempBoard = Array.from(board);
    const { x, y } = coordinates;
    tempBoard[x][y].isShown = true;
    if (tempBoard[x][y].neighboringMines === 0) {
      clearNeighbors(coordinates, tempBoard);
    }
    if (tempBoard[x][y].isMine) {
      alert('KABOOM');
      const playAgain = confirm('Would you like to play again?');
      if (playAgain){
        const tempBoard = initBoard(5);
        placeMines(tempBoard, 3);
        setBoard(tempBoard);
        return;
      }
    }
    setBoard(tempBoard);
  }

  return (
    <div className={styles.boardRoot}>
      {board.map((row, iIndex) => {
        return row.map((cell, jIndex) => {
          const coordinates = { x: iIndex, y: jIndex };
          return (
            <Cell
              key={`${jIndex}${iIndex}`}
              isMine={cell.isMine}
              neighbors={cell.neighboringMines}
              clearNeighbors={() => clearNeighbors}
              handleClick={handleCellClick}
              coordinates={coordinates}
              isShown={cell.isShown}
            />
          );
        });
      })}
    </div>
  );
}

export default Board;
