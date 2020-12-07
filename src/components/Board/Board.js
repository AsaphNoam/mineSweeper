import React, { useState } from 'react';
import Cell from '../Cell/Cell';
import { v4 as uuidv4 } from 'uuid';
import styles from './Board.scss';

// TODO: Accept N as an input
//       decide which cells hold mines, and pass down isMine to cells as props
//       Pass down how many mines each sell is adjacent to

function initializeBoard(N) {
  const grid = [];
  for (let i = 0; i < N; i++) {
    const row = [];
    for (let j = 0; j < N; j++) {
      row.push([0,0]);
    }
    grid.push(row);
  }
  return grid;
}

// Places bombs and returns array with mine locations
function placeMines(board, numberOfMines) {
  let minesLocations = []
  while (minesLocations.length < numberOfMines){
    let coordinate = generateRandomTuple(board.length);
    let coordinateString = JSON.stringify(coordinate);
    if(!minesLocations.includes(coordinateString)){
      minesLocations.push(coordinateString);
      board[coordinate.x][coordinate.y] = [1,0];
      updateNeighbors(board, coordinate);
    }
  }
}

function generateRandomTuple(N){
  let x =  Math.floor(Math.random() * N);
  let y = Math.floor(Math.random() * N);
  return {x:x, y:y};
}

//Increment the number of adjacent mines in every cell adjacent to a mine.
function updateNeighbors(board, coordinate){
  let x = coordinate.x;
  let y = coordinate.y;
  for(let i = - 1; i < 2; i++){
    for(let j = 0 - 1; j < 2; j++){
      try{
        board[x+i][y+j][1] +=1;
        console.log('incremented')
      }
      catch (e){
        console.log('Invalid indices' + i,j)
      }
    }
  }
}

function Board() {
  const board = initializeBoard(5);
  placeMines(board, 3);
  console.log(board);
  return (
    <div className={styles.boardRoot}>
      {board.map((row) => {
        return row.map((mine) => {
          return <Cell key={uuidv4()} isMine={mine[0] === 1} neighbors={mine[1]}/>;
        });
      })}
    </div>
  );
}
export default Board;
