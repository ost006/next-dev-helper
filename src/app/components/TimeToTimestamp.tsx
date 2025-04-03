'use client';

import { useState, useEffect } from 'react';

interface TimeToTimestampProps {
  timezone: string;
  gmtOffset: string;
}

export default function TimeToTimestamp({ timezone, gmtOffset }: TimeToTimestampProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [timestampResult, setTimestampResult] = useState('');

  useEffect(() => {
    // Initialize with current time
    const now = new Date();
    
    // Format current time for datetime-local input (local time)
    const formattedDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    
    setCurrentTime(formattedDate);
    setTimestampResult(Math.floor(now.getTime() / 1000).toString());
  }, []);

  const convertToTimestamp = () => {
    try {
      const date = new Date(currentTime);
      const timestamp = Math.floor(date.getTime() / 1000);
      setTimestampResult(timestamp.toString());
    } catch (error) {
      console.error('Conversion error:', error);
      setTimestampResult('Invalid date format');
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Current Time to Timestamp
      </h2>
      <p className="text-xs text-slate-400 -mt-3 mb-4">({timezone} {gmtOffset})</p>
      <div className="space-y-4">
        <div className="relative">
          <input
            type="datetime-local"
            value={currentTime}
            onChange={(e) => setCurrentTime(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-white border-slate-600"
          />
        </div>
        <button
          onClick={convertToTimestamp}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Convert to Timestamp
        </button>
        {timestampResult && (
          <div className="mt-4 p-3 bg-slate-700 rounded-md">
            <p className="font-medium text-white">Result:</p>
            <p className="break-all text-slate-200">{timestampResult}</p>
          </div>
        )}
      </div>
    </div>
  );
} 