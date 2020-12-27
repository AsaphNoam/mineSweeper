import React, { useEffect, useRef } from 'react';
import styles from './Cell.scss';

function Cell(props) {
  const { isShown, isMine, neighbors, isFlagged, toggleFlag, cellSize } = props;
  const cellRef = useRef(null);
  const handleRightClick = (event) => {
    event.preventDefault();
    if (event.target === cellRef.current) {
      toggleFlag();
    }
  };
  useEffect(() => {
    document.addEventListener('contextmenu', handleRightClick);
    return () => window.removeEventListener('contextmenu', handleRightClick);
  }, []);
  return (
    <button
      style={{
        backgroundColor: isShown
          ? isMine
            ? 'red'
            : 'lightblue'
          : isFlagged
          ? 'orange'
          : '',
        width: cellSize,
      }}
      ref={cellRef}
      className={styles.cell}
      onClick={props.handleClick}
    >
      {isShown ? (isMine ? 'Mine' : neighbors) : isFlagged ? 'Flag' : ''}
    </button>
  );
}
export default Cell;
