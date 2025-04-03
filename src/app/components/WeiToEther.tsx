'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WEI_UNITS = [
  { value: 'wei', label: 'Wei', multiplier: 1n },
  { value: 'kwei', label: 'Kwei', multiplier: 1000n },
  { value: 'mwei', label: 'Mwei', multiplier: 1000000n },
  { value: 'gwei', label: 'Gwei', multiplier: 1000000000n },
  { value: 'ether', label: 'Ether', multiplier: 1000000000000000000n },
];

export default function WeiToEther() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('wei');
  const [toUnit, setToUnit] = useState('ether');
  const [result, setResult] = useState('');

  useEffect(() => {
    // Initialize with 1 ETH in Wei
    const oneEtherInWei = ethers.parseEther('1');
    setValue(oneEtherInWei.toString());
    setResult('1');
  }, []);

  const convert = () => {
    try {
      const fromUnitData = WEI_UNITS.find(unit => unit.value === fromUnit);
      const toUnitData = WEI_UNITS.find(unit => unit.value === toUnit);
      
      if (!fromUnitData || !toUnitData) {
        setResult('Invalid unit selection');
        return;
      }

      // Handle decimal values by parsing as float first
      if (value.includes('.')) {
        // For decimal values, use ethers.js parsing functions
        let valueInWei;
        
        if (fromUnit === 'ether') {
          valueInWei = ethers.parseEther(value);
        } else if (fromUnit === 'gwei') {
          valueInWei = ethers.parseUnits(value, 'gwei');
        } else {
          // For other units, manually calculate
          const [whole, fraction] = value.split('.');
          const wholeBigInt = BigInt(whole) * fromUnitData.multiplier;
          const fractionBigInt = BigInt(fraction.padEnd(fraction.length, '0')) * 
            fromUnitData.multiplier / BigInt(10 ** fraction.length);
          valueInWei = wholeBigInt + fractionBigInt;
        }
        
        // Convert to target unit
        if (toUnit === 'ether') {
          setResult(ethers.formatEther(valueInWei));
        } else if (toUnit === 'gwei') {
          setResult(ethers.formatUnits(valueInWei, 'gwei'));
        } else {
          const resultValue = valueInWei / toUnitData.multiplier;
          setResult(resultValue.toString());
        }
      } else {
        // Original logic for non-decimal values
        const valueInWei = BigInt(value) * fromUnitData.multiplier;
        const resultInWei = valueInWei / toUnitData.multiplier;
        
        if (toUnit === 'ether') {
          setResult(ethers.formatEther(resultInWei));
        } else {
          setResult(resultInWei.toString());
        }
      }
    } catch (error) {
      console.error('Conversion error:', error);
      setResult('Invalid value');
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Wei Unit Converter</h2>
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-white border-slate-600"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-white border-slate-600"
          >
            {WEI_UNITS.map(unit => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={convert}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Convert
        </button>
        <div className="flex gap-2">
          <input
            type="text"
            value={result}
            readOnly
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-white border-slate-600"
          />
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-white border-slate-600"
          >
            {WEI_UNITS.map(unit => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
} 