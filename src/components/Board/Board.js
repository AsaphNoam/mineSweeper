import React, { useEffect, useState } from 'react';
import Cell from '../Cell/Cell';
import styles from './Board.scss';
import { Card } from 'wix-style-react';
import { v4 as uuidv4 } from 'uuid';

// TODO: Fix win message

function Board(props) {
  const { size, numberOfMines } = props;
  const [board, setBoard] = useState(createBoard(size, numberOfMines));
  const [uncoveredCells, setUncoveredCells] = useState(0);

  useEffect(() => {
    if (uncoveredCells === size ** 2 - numberOfMines) {
      alert('You win!');
    }
  }, [uncoveredCells]);

  console.log(`Rendering: ${uncoveredCells}`);
  return (
    <Card className={styles.boardRoot}>
      {board.map((row, iIndex) =>
        row.map((cell, jIndex) => {
          const coordinates = { x: iIndex, y: jIndex };
          return (
            <Cell
              key={uuidv4()}
              isMine={cell.isMine}
              neighbors={findNeighboringMines(coordinates)}
              handleClick={() => handleCellClick(coordinates)}
              isShown={cell.isShown}
              isFlagged={cell.isFlagged}
              toggleFlag={() => toggleFlag(coordinates)}
              cellSize={100 / size + '%'}
            />
          );
        }),
      )}
    </Card>
  );

  function toggleFlag(coordinate) {
    const tempBoard = Array.from(board);
    const { x, y } = coordinate;
    tempBoard[x][y].isFlagged = !tempBoard[x][y].isFlagged;
    setBoard(tempBoard);
  }

  function uncoverNeighbors(coordinates) {
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
              !tempBoard[x + i][y + j].isMine &&
              !tempBoard[x + i][y + j].isFlagged
            ) {
              tempBoard[x + i][y + j].isShown = true;
              console.log(`Uncovered for [${x}][${y}]`);
              setUncoveredCells(uncoveredCells + 1);
              console.log(uncoveredCells);
              if (findNeighboringMines({ x: x + i, y: y + j }) === 0) {
                console.log('pushed stack');
                cellStack.push({ x: x + i, y: y + j });
                setUncoveredCells(uncoveredCells + 1);
              }
            }
          } catch (e) {}
        });
      });
    }
    setBoard(tempBoard);
  }

  function handleCellClick(coordinate) {
    let tempBoard = Array.from(board);
    const { x, y } = coordinate;
    if (tempBoard[x][y].isFlagged || tempBoard[x][y].isShown) {
      return;
    }
    if (tempBoard[x][y].isMine) {
      alert('KABOOM');
      // const playAgain = confirm('Would you like to play again?');
      const playAgain = true;
      if (playAgain) {
        setBoard(createBoard(size, numberOfMines));
      }
    } else {
      tempBoard[x][y].isShown = true;
      setBoard(tempBoard);
      setUncoveredCells(uncoveredCells + 1);
      if (findNeighboringMines(coordinate) === 0) {
        uncoverNeighbors(coordinate);
      }
    }
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
    }
  }
}

function generateRandomCoordinates(N) {
  const x = Math.floor(Math.random() * N);
  const y = Math.floor(Math.random() * N);
  return { x, y };
}

export { Board };
