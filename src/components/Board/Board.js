import React, { useState } from 'react';
import Cell from '../Cell/Cell';
import styles from './Board.scss';
// TODO:
//       Fix win alert to function properly

function Board(props) {
  const { size, numberOfMines } = props;
  const [board, setBoard] = useState(createBoard(size, numberOfMines));
  const [uncoveredCells, setUncoveredCells] = useState(0);

  return (
    <div className={styles.boardRoot}>
      {board.map((row, iIndex) => {
        return row.map((cell, jIndex) => {
          const coordinates = { x: iIndex, y: jIndex };
          return (
            <Cell
              key={`${jIndex}${iIndex}`}
              isMine={cell.isMine}
              neighbors={findNeighboringMines(coordinates)}
              handleClick={() => handleCellClick(coordinates)}
              isShown={cell.isShown}
              isFlagged={cell.isFlagged}
              toggleFlag={() => toggleFlag(coordinates)}
            />
          );
        });
      })}
    </div>
  );

  function toggleFlag(coordinate) {
    const tempBoard = Array.from(board);
    const { x, y } = coordinate;
    tempBoard[x][y].isFlagged = !tempBoard[x][y].isFlagged;
    setBoard(tempBoard);
  }

  function clearNeighbors(coordinates) {
    const tempBoard = Array.from(board);
    const cellStack = [];
    cellStack.push(coordinates);
    while (cellStack.length > 0) {
      const curCoordinate = cellStack.pop();
      const { x, y } = curCoordinate;
      [-1, 0, 1].forEach((i) => {
        [-1, 0, 1].forEach((j) => {
          try {
            if (
              !tempBoard[x + i][y + j].isShown &&
              !tempBoard[x + i][y + j].isMine
            ) {
              tempBoard[x + i][y + j].isShown = true;
              setUncoveredCells(uncoveredCells + 1);
              if (findNeighboringMines({ x: x + i, y: y + j }) === 0) {
                cellStack.push({ x: x + i, y: y + j });
              }
            }
          } catch (e) {}
        });
      });
    }
    setBoard(tempBoard);
  }

  function handleCellClick(coordinate) {
    const tempBoard = Array.from(board);
    const { x, y } = coordinate;
    if (tempBoard[x][y].isFlagged) {
      return;
    }
    if (tempBoard[x][y].isMine) {
      alert('KABOOM');
      const playAgain = confirm('Would you like to play again?');
      if (playAgain) {
        setBoard(createBoard(size, numberOfMines));
        return;
      }
    }
    tempBoard[x][y].isShown = true;
    setBoard(tempBoard);
    if (findNeighboringMines(coordinate) === 0) {
      clearNeighbors(coordinate);
    } else setUncoveredCells(uncoveredCells + 1);
    if (uncoveredCells === size ** 2 - numberOfMines) {
      const playAgain = confirm('You win! play again?');
      if (playAgain) {
        setBoard(createBoard(size, numberOfMines));
        setUncoveredCells(0);
      }
    }
    console.log(uncoveredCells);
  }

  function findNeighboringMines(coordinate) {
    const { x, y } = coordinate;
    let sum = 0;
    [-1, 0, 1].forEach((i) => {
      [0, 1, -1].forEach((j) => {
        try {
          if (board[x + i][y + j].isMine) sum += 1;
        } catch (e) {}
      });
    });
    return sum;
  }
}

const createBoard = (boardSize, numberOfMines) => {
  const board = Array.from(Array(boardSize), () =>
    Array.from(Array(boardSize), () => ({
      isMine: false,
      isShown: false,
      isFlagged: false,
    })),
  );
  placeMines(board, numberOfMines);
  return board;
};

function placeMines(board, numberOfMines) {
  const minesCoordinates = [];
  while (minesCoordinates.length < numberOfMines) {
    const coordinate = generateRandomCoordinates(board.length);
    const coordinateString = JSON.stringify(coordinate);
    if (!minesCoordinates.includes(coordinateString)) {
      minesCoordinates.push(coordinateString);
      board[coordinate.x][coordinate.y].isMine = true;
      // updateNeighbors(board, coordinate);
    }
  }
}

function generateRandomCoordinates(N) {
  const x = Math.floor(Math.random() * N);
  const y = Math.floor(Math.random() * N);
  return { x, y };
}

export { Board };
