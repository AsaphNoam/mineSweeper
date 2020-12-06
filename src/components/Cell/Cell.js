import React, { useState } from 'react';

function Cell() {
  const [cover, setCover] = useState('Hidden');
  // return <div>{cover} Cell</div>;
  return (
    <button
      onClick={() => {
        setCover('Uncovered');
      }}
    >
      {cover} Cell
    </button>
  );
}
export default Cell;
