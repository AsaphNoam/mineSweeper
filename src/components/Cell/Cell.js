import React, { useEffect, useRef, useState } from 'react';
import styles from './Cell.scss';
import {
  Page,
  Container,
  Row,
  Col,
  Card,
  EmptyState,
  Button,
  Box,
} from 'wix-style-react';

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
