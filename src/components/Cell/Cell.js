import React, { useState } from 'react';
import styles from './Cell.scss';



function Cell(props) {
  const { isShown, isMine, neighbors, coordinates } = props;
  // TODO: Add functionality to flag as mine
  //       Add loss on mine uncovering
  return (
    <button style={isShown && isMine?{backgroundColor: 'red'}: isShown? {backgroundColor: "lightblue"} :{}}
      className={styles.cell}
      onClick={() => props.handleClick(coordinates)}
    >
      {isShown? (isMine? 'Mine' : neighbors) : 'Hidden'}
    </button>
  );
}
export default Cell;
