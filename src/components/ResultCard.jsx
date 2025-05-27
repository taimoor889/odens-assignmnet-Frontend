import React from 'react';

const ResultCard = ({ price, onReset }) => (
  <div className="text-center">
    <h2 className="text-2xl font-semibold text-[#12666F] mb-4">Predicted Price</h2>
    <p className="text-4xl font-bold text-gray-800 mb-6">€ {price}</p>
    <button
      onClick={onReset}
      className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      Try New Value
    </button>
  </div>
);

export default ResultCard;
