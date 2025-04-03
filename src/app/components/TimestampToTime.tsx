'use client';

import { useState, useEffect } from 'react';

interface TimestampToTimeProps {
  timezone: string;
  gmtOffset: string;
}

export default function TimestampToTime({ timezone, gmtOffset }: TimestampToTimeProps) {
  const [timestamp, setTimestamp] = useState('');
  const [currentTimeResult, setCurrentTimeResult] = useState('');

  useEffect(() => {
    // Initialize with current timestamp
    const now = new Date();
    const currentTimestamp = Math.floor(now.getTime() / 1000);
    setTimestamp(currentTimestamp.toString());
    setCurrentTimeResult(now.toLocaleString());
  }, []);

  const convertToCurrentTime = () => {
    try {
      const date = new Date(parseInt(timestamp) * 1000);
      setCurrentTimeResult(date.toLocaleString());
    } catch (error) {
      console.error('Conversion error:', error);
      setCurrentTimeResult('Invalid timestamp');
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Timestamp to Current Time</h2>
      <div className="space-y-4">
        <input
          type="number"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          placeholder="Enter Unix timestamp"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-white border-slate-600"
        />
        <button
          onClick={convertToCurrentTime}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Convert to Current Time
        </button>
        {currentTimeResult && (
          <div className="mt-4 p-3 bg-slate-700 rounded-md">
            <p className="font-medium text-white">Result ({timezone} {gmtOffset}):</p>
            <p className="text-slate-200">{currentTimeResult}</p>
          </div>
        )}
      </div>
    </div>
  );
} 