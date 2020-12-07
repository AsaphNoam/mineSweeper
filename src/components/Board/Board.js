import React, {useState} from 'react';
import Cell from '../Cell/Cell';
import {v4 as uuidv4} from 'uuid';
import styles from './Board.scss';

// TODO: Accept N as an input
//       decide which cells hold mines, and pass down isMine to cells as props
//       Pass down how many mines each sell is adjacent to

function initializeBoard(N) {
  const grid = [];
  for (let i = 0; i < N; i++) {
    const row = [];
    for (let j = 0; j < N; j++) {
      row.push({isMine: false, neighboringMines: 0, isShown: false});
    }
    grid.push(row);
  }
  return grid;
}

// Places bombs and returns array with mine locations
function placeMines(board, numberOfMines) {
  let minesLocations = []
  while (minesLocations.length < numberOfMines) {
    let coordinate = generateRandomTuple(board.length);
    let coordinateString = JSON.stringify(coordinate);
    if (!minesLocations.includes(coordinateString)) {
      minesLocations.push(coordinateString);
      board[coordinate.x][coordinate.y].isMine = true;
      updateNeighbors(board, coordinate);
    }
  }
}

function generateRandomTuple(N) {
  let x = Math.floor(Math.random() * N);
  let y = Math.floor(Math.random() * N);
  return {x: x, y: y};
}

//Increment the number of adjacent mines in every cell adjacent to a mine.
function updateNeighbors(board, coordinate) {
  let x = coordinate.x;
  let y = coordinate.y;
  for (let i = -1; i < 2; i++) {
    for (let j = 0 - 1; j < 2; j++) {
      try {
        board[x + i][y + j].neighboringMines += 1;
      } catch (e) {
      }
    }
  }
}

function Board() {

  const tempBoard = initializeBoard(5);
  placeMines(tempBoard, 4);
  const [board, setBoard] = useState(tempBoard);

  function clearNeighbors(coordinate) {
    const tempBoard = board
    let x = coordinate.x;
    let y = coordinate.y;
    for (let i = -1; i < 2; i++) {
      for (let j = 0 - 1; j < 2; j++) {
        try {
          tempBoard[x + i][y + j].neighboringMines = 100;
        } catch (e) {
        }
      }
    }
    setBoard(tempBoard);
    console.log(board)
    console.log('cleared neighbors');
  }

  function handleCellClick(coordinates) {
    const tempBoard = board;
    tempBoard[coordinates.x][coordinates.y].isShown = true;
    setBoard(tempBoard);
    console.log(tempBoard);
  }

  return (
    <div className={styles.boardRoot}>
      {board.map((row, iIndex) => {
        return row.map((cell, jIndex) => {
          let coordinates = {x: iIndex, y: jIndex}
          return <Cell
            key={jIndex + '' + iIndex} isMine={cell.isMine} neighbors={cell.neighboringMines}
            clearNeighbors={() => clearNeighbors(coordinates)} handleClick={handleCellClick}
            coordinates={coordinates} isShown={cell.isShown}/>;
        });
      })}
    </div>
  );
}

export default Board;
