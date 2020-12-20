import React, { useState } from 'react';
import Cell from '../Cell/Cell';
import styles from './Board.scss';

// TODO: Accept N as an input
//       decide which cells hold mines, and pass down isMine to cells as props
//       Pass down how many mines each sell is adjacent to

const createBoard = (N) =>
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
  [-1, 0, 1].forEach((i) => {
    [0, 1, -1].forEach(j =>{
      try {
        board[x + i][y + j].neighboringMines += 1;
      } catch (e) {}
    });
  });
}



function Board() {
  const tempBoard = createBoard(5);
  placeMines(tempBoard, 3);
  const [board, setBoard] = useState(tempBoard);

  function clearNeighbors(coordinates, board) {
    const cellStack = [];
    cellStack.push(coordinates);
    while (cellStack.length > 0) {
      const curCoordinates = cellStack.pop();
      const x = curCoordinates.x;
      const y = curCoordinates.y;
      [-1, 0, 1].forEach((i) => {
        [-1, 0, 1].forEach((j) => {
          try {
            if (
              board[x + i][y + j].neighboringMines < 2 &&
              !board[x + i][y + j].isShown &&
              !board[x + i][y + j].isMine
            ) {
              board[x + i][y + j].isShown = true;
              if (board[x + i][y + j].neighboringMines < 1)
                cellStack.push({ x: x + i, y: y + j });
            }
          } catch (e) {}
        });
      });
    }
    setBoard(board);
  }

  function handleCellClick(coordinates) {
    const tempBoard = Array.from(board);
    const { x, y } = coordinates;
    tempBoard[x][y].isShown = true;
    if (tempBoard[x][y].neighboringMines === 0) {
      clearNeighbors(coordinates, tempBoard);
    }
    if (tempBoard[x][y].isMine) {
      return handleMine();
    }
    setBoard(tempBoard);
  }

  function handleMine() {
    alert('KABOOM');
    const playAgain = confirm('Would you like to play again?');
    if (playAgain) {
      const newBoard = createBoard(5);
      placeMines(newBoard, 3);
      setBoard(newBoard);
    }
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
