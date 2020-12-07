import React, { useState } from 'react';
import styles from './Cell.scss';

function Cell(props) {
  const [cover, setCover] = useState('Hidden');
  // TODO: Add functionality to flag as mine
  //       Add loss on mine uncovering
  return (
    <button
      className={styles.cell}
      onClick={() => {
        setCover(props.isMine ? 'Mine' : 'No Mine');
      }}
    >
      {cover}
    </button>
  );
}
export default Cell;
