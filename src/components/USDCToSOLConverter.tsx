"use client";

import { useState, useEffect } from "react";

interface USDCToSOLConverterProps {
  onAmountChange: (solAmount: string) => void;
  className?: string;
}

export function USDCToSOLConverter({ onAmountChange, className = "" }: USDCToSOLConverterProps) {
  const [usdcAmount, setUsdcAmount] = useState("");
  const [solAmount, setSolAmount] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Current SOL price in USD (you can update this or fetch from an API)
  const SOL_PRICE_USD = 176;
  
  const convertUSDCToSOL = (usdc: string) => {
    const usdcNum = parseFloat(usdc);
    if (isNaN(usdcNum) || usdcNum <= 0) {
      setSolAmount("");
      onAmountChange("");
      return;
    }
    
    // Convert USDC to SOL (USDC is 1:1 with USD)
    const solValue = usdcNum / SOL_PRICE_USD;
    const solFormatted = solValue.toFixed(6); // 6 decimal places for SOL precision
    
    setSolAmount(solFormatted);
    onAmountChange(solFormatted);
  };
  
  const handleUSDCChange = (value: string) => {
    setUsdcAmount(value);
    convertUSDCToSOL(value);
  };
  
  const handleSOLChange = (value: string) => {
    setSolAmount(value);
    setUsdcAmount(""); // Clear USDC when user manually enters SOL
    onAmountChange(value);
  };

  return (
    <div className={`bg-gray-50 rounded-lg p-4 border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-700">Quick Converter</h4>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 text-xs hover:text-blue-700 transition-colors"
        >
          {isExpanded ? "Hide" : "Show"} USDC → SOL
        </button>
      </div>
      
      {isExpanded && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              USDC Amount
            </label>
            <div className="relative">
              <input
                type="number"
                value={usdcAmount}
                onChange={(e) => handleUSDCChange(e.target.value)}
                placeholder="5.00"
                step="0.01"
                min="0.01"
                className="w-full pr-12 py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs font-medium">
                USDC
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              ≈ ${usdcAmount ? parseFloat(usdcAmount).toFixed(2) : "0.00"} USD
            </p>
          </div>
          
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              SOL Amount
            </label>
            <div className="relative">
              <input
                type="number"
                value={solAmount}
                onChange={(e) => handleSOLChange(e.target.value)}
                placeholder="0.028"
                step="0.000001"
                min="0.000001"
                className="w-full pr-12 py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs font-medium">
                SOL
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              ≈ ${solAmount ? (parseFloat(solAmount) * SOL_PRICE_USD).toFixed(2) : "0.00"} USD
            </p>
          </div>
          
          <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded border border-blue-100">
            <p className="font-medium text-blue-700 mb-1">💡 Tip:</p>
            <p>Enter USDC amount to automatically calculate the equivalent SOL. Current SOL price: ${SOL_PRICE_USD.toLocaleString()}</p>
          </div>
        </div>
      )}
      
      {!isExpanded && (
        <div className="text-xs text-gray-500">
          Click "Show USDC → SOL" to convert USDC amounts to SOL automatically
        </div>
      )}
    </div>
  );
} 