'use client';

import { useState, useEffect } from 'react';
import { keccak256, toUtf8Bytes, isHexString } from 'ethers';

export default function Keccak256Hash() {
  const [input, setInput] = useState('');
  const [isHex, setIsHex] = useState(false);
  const [hashResult, setHashResult] = useState('');

  useEffect(() => {
    setInput('');
    setHashResult(keccak256(toUtf8Bytes('Hello, World!')));
  }, []);

  const calculateHash = () => {
    try {
      let hash;
      if (isHex) {
        const hexInput = input
        if (!isHexString(hexInput)) {
          setHashResult('Invalid hex string');
          return;
        }
        // Convert hex string to bytes
        const bytes = Buffer.from(hexInput, 'hex');
        hash = keccak256(bytes);
      } else {
        // Convert string to UTF-8 bytes
        hash = keccak256(toUtf8Bytes(input));
      }
      setHashResult(hash);
    } catch (error) {
      setHashResult('Invalid input');
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Keccak256 Hash</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isHex ? "Enter hex string (e.g., 0x1234)" : "Enter text"}
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-white border-slate-600"
          />
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={isHex}
              onChange={(e) => setIsHex(e.target.checked)}
              className="rounded border-slate-600 text-blue-500 focus:ring-blue-500 bg-slate-700"
            />
            Hex Input
          </label>
        </div>
        <button
          onClick={calculateHash}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Calculate Hash
        </button>
        {hashResult && (
          <div className="mt-4 p-3 bg-slate-700 rounded-md">
            <p className="font-medium text-white">Hash Result:</p>
            <p className="text-slate-200 break-all">{hashResult}</p>
          </div>
        )}
      </div>
    </div>
  );
} 