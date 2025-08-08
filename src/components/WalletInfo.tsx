"use client";

import { useWallet } from "@crossmint/client-sdk-react-ui";

export function WalletInfo() {
  const { wallet, status } = useWallet();

  if (status === "in-progress") {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Your Wallet</h3>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span>Loading wallet...</span>
        </div>
      </div>
    );
  }

  if (status === "loaded" && wallet) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Your Wallet</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Address:</span>
            <span className="text-xs text-gray-500">SOL</span>
          </div>
          <div className="mt-2">
            <span className="font-mono text-sm bg-white px-3 py-2 rounded-lg block break-all text-gray-900 border border-gray-200">
              {wallet.address}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null; // Don't show anything if wallet is not connected
} 