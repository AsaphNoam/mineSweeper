import React, { useState } from 'react';
import styles from './Cell.scss';

function Cell(props) {
  const [cover, setCover] = useState('Hidden');
  const [neighbors, setNeighbors] = useState();
  // TODO: Add functionality to flag as mine
  //       Add loss on mine uncovering
  return (
    <button
      className={styles.cell}
      onClick={() => {
        setCover(props.isMine ? 'Mine' : '');
        setNeighbors(props.isMine? "" : props.neighbors)
      }}
    >
      {cover} {neighbors}
    </button>
  );
}
export default Cell;
