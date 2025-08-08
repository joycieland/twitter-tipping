"use client";

import { useEffect, useState } from "react";
import { Balances, useWallet } from "@crossmint/client-sdk-react-ui";

export function WalletBalance() {
  const { wallet } = useWallet();
  const [balances, setBalances] = useState<Balances | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBalances() {
      if (!wallet) return;
      setLoading(true);
      try {
        const balances = await wallet.balances();
        setBalances(balances);
      } catch (error) {
        console.error("Error fetching wallet balances:", error);
        alert("Error fetching wallet balances: " + error);
      } finally {
        setLoading(false);
      }
    }
    fetchBalances();
  }, [wallet]);

  const formatBalance = (balance: string) => {
    return Number(balance).toFixed(4);
  };

  if (!wallet) {
    return null; // Don't show anything if wallet is not connected
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Balance</h3>
        </div>
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading balances...</span>
        </div>
      </div>
    );
  }

  if (!balances) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Balance</h3>
      </div>
      
      <div className="space-y-3">
        {/* SOL Balance */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-bold text-sm">◎</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">SOL</p>
              <p className="text-xs text-gray-500">Solana</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900">
              {balances.nativeToken ? formatBalance(balances.nativeToken.amount) : '0.0000'}
            </p>
          </div>
        </div>
        
        {/* USDC Balance */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xs">$</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">USDC</p>
              <p className="text-xs text-gray-500">USD Coin</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900">
              {balances.usdc ? formatBalance(balances.usdc.amount) : '0.0000'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 