import React, { useState } from 'react';
import Cell from '../Cell/Cell';
import { v4 as uuidv4 } from 'uuid';
import './Board.scss';

function Board() {
  const grid = [];
  const N = 4;
  for (let i = 0; i < N ** 2; i++) {
    grid.push(new Cell());
  }
  console.log(grid);
  return (
    <div className={'board-root'}>
      ROOT
      {grid.map((cell) => {
        return <span key={uuidv4()}>{cell}</span>;
      })}
    </div>
  );
}
export default Board;
