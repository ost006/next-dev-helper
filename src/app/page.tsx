'use client';

import TimeToTimestamp from './components/TimeToTimestamp';
import TimestampToTime from './components/TimestampToTime';
import NumberToHex from './components/NumberToHex';
import HexToNumber from './components/HexToNumber';
import WeiToEther from './components/WeiToEther';
import Keccak256Hash from './components/Keccak256Hash';

export default function Home() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const gmtOffset = (() => {
    const date = new Date();
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
    const minutes = String(Math.abs(offset) % 60).padStart(2, '0');
    return `GMT${sign}${hours}:${minutes}`;
  })();

  return (
    <main className="min-h-screen p-8 bg-slate-900">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white mb-8">Developer Tools</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TimeToTimestamp timezone={timezone} gmtOffset={gmtOffset} />
          <TimestampToTime timezone={timezone} gmtOffset={gmtOffset} />
          <NumberToHex />
          <HexToNumber />
          <WeiToEther />
          <Keccak256Hash />
        </div>
      </div>
    </main>
  );
}
