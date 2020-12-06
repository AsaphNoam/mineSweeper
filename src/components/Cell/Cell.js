import React, { useState } from 'react';

function Cell() {
  const [cover, setCover] = useState('Hidden');
  // return <div>{cover} Cell</div>;
  return (
    <div
      onClick={() => {
        setCover('Uncovered');
      }}
    >
      {cover} Cell
    </div>
  );
}
export default Cell;
