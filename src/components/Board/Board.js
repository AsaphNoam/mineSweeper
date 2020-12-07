import React, {useState} from 'react';
import Cell from '../Cell/Cell';
import {v4 as uuidv4} from 'uuid';
import styles from './Board.scss';

// TODO: Accept N as an input
//       decide which cells hold mines, and pass down isMine to cells as props
//       Pass down how many mines each sell is adjacent to

function initBoard(N) {
  return Array.from(Array(N),
    () => Array.from(Array(N),
      () => ({isMine: false, neighboringMines: 0, isShown: false})));
}

function placeMines(board, numberOfMines) {
  let minesLocations = []
  while (minesLocations.length < numberOfMines) {
    let coordinate = generateRandomCoordinates(board.length);
    let coordinateString = JSON.stringify(coordinate);
    if (!minesLocations.includes(coordinateString)) {
      minesLocations.push(coordinateString);
      board[coordinate.x][coordinate.y].isMine = true;
      updateNeighbors(board, coordinate);
    }
  }
}

function generateRandomCoordinates(N) {
  let x = Math.floor(Math.random() * N);
  let y = Math.floor(Math.random() * N);
  return {x, y};
}

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

  const tempBoard = initBoard(5);
  placeMines(tempBoard, 1);
  const [board, setBoard] = useState(tempBoard);

  function clearNeighbors(coordinates, tempBoard) {
    let x = coordinates.x;
    let y = coordinates.y;
    for (let i = -1; i < 2; i++) {
      for (let j = 0 - 1; j < 2; j++) {
        try {
          //TODO Make this act recursively so that clicking on a 0 opens all other zeroes
          if (tempBoard[x + i][y + j].neighboringMines === 0) {
            tempBoard[x + i][y + j].isShown = true;
          }
        } catch (e) {
        }
      }
    }
    setBoard(tempBoard);
    console.log(board)
    console.log('cleared neighbors');
  }

  function handleCellClick(coordinates) {
    const tempBoard = Array.from(board);
    tempBoard[coordinates.x][coordinates.y].isShown = true;
    if (tempBoard[coordinates.x][coordinates.y].neighboringMines === 0) {
      clearNeighbors(coordinates, tempBoard)
    }
    setBoard(tempBoard);
    console.log(board);
  }

  console.log('rendering Board');
  return (
    <div className={styles.boardRoot}>
      {board.map((row, iIndex) => {
        return row.map((cell, jIndex) => {
          let coordinates = {x: iIndex, y: jIndex}
          return <Cell
            key={`${jIndex}${iIndex}`} isMine={cell.isMine} neighbors={cell.neighboringMines}
            clearNeighbors={() => clearNeighbors(coordinates)}
            handleClick={(coordinates) => handleCellClick(coordinates)}
            coordinates={coordinates} isShown={cell.isShown}/>;
        });
      })}
    </div>
  );
}

export default Board;
