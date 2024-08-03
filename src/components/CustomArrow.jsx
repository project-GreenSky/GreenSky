// CustomArrow.js
import React from 'react';

const CustomArrow = ({ className, style, onClick, direction }) => {
  return (
    <div
      className={`${className} ${direction === 'next' ? 'right-1 bottom-2' : 'left-2'} absolute top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-full cursor-pointer hover:bg-gray-700 transition`}
      style={{ ...style }}
      onClick={onClick}
    >
      {direction === 'next' ? '›' : '‹'}
    </div>
  );
};

export default CustomArrow;
