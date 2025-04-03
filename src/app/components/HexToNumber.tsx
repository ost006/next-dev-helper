'use client';

import { useState, useEffect } from 'react';

export default function HexToNumber() {
  const [hex, setHex] = useState('');
  const [numberResult, setNumberResult] = useState('');

  useEffect(() => {
    // Initialize with current timestamp in hex
    const now = new Date();
    const currentTimestamp = Math.floor(now.getTime() / 1000);
    setHex(`0x${currentTimestamp.toString(16)}`);
    setNumberResult(currentTimestamp.toString());
  }, []);

  const convertToNumber = () => {
    try {
      // Remove '0x' prefix if present and convert to decimal
      const hexValue = hex.replace(/^0x/, '');
      const num = parseInt(hexValue, 16);
      if (isNaN(num)) {
        setNumberResult('Invalid hex number');
        return;
      }
      setNumberResult(num.toString());
    } catch (error) {
      setNumberResult('Invalid hex number');
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Hexadecimal to Number</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          placeholder="Enter hex number (e.g., 0x1a2b)"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-white border-slate-600"
        />
        <button
          onClick={convertToNumber}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Convert to Number
        </button>
        {numberResult && (
          <div className="mt-4 p-3 bg-slate-700 rounded-md">
            <p className="font-medium text-white">Result:</p>
            <p className="text-slate-200">{numberResult}</p>
          </div>
        )}
      </div>
    </div>
  );
} 