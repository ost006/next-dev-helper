'use client';

import { useState, useEffect } from 'react';

export default function NumberToHex() {
  const [number, setNumber] = useState('');
  const [hexResult, setHexResult] = useState('');

  useEffect(() => {
    // Initialize with current timestamp
    const now = new Date();
    const currentTimestamp = Math.floor(now.getTime() / 1000);
    setNumber(currentTimestamp.toString());
    setHexResult(`0x${currentTimestamp.toString(16)}`);
  }, []);

  const convertToHex = () => {
    try {
      const num = parseInt(number);
      if (isNaN(num)) {
        setHexResult('Invalid number');
        return;
      }
      setHexResult(`0x${num.toString(16)}`);
    } catch (error) {
      setHexResult('Invalid number');
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Number to Hexadecimal</h2>
      <div className="space-y-4">
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter number"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-white border-slate-600"
        />
        <button
          onClick={convertToHex}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Convert to Hex
        </button>
        {hexResult && (
          <div className="mt-4 p-3 bg-slate-700 rounded-md">
            <p className="font-medium text-white">Result:</p>
            <p className="text-slate-200">{hexResult}</p>
          </div>
        )}
      </div>
    </div>
  );
} 