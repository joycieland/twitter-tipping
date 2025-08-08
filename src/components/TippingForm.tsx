"use client";

import { useState } from "react";
import { useWallet } from "@crossmint/client-sdk-react-ui";
import { USDCToSOLConverter } from "./USDCToSOLConverter";

export function TippingForm() {
  const { wallet: userWallet } = useWallet();
  const [twitterUsername, setTwitterUsername] = useState("");
  const [tipAmount, setTipAmount] = useState("0.01");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [explorerLink, setExplorerLink] = useState<string | null>(null);

  const handleTip = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!twitterUsername.trim()) {
      setError("Please enter a Twitter username");
      return;
    }

    if (!userWallet) {
      setError("Please connect your wallet first");
      return;
    }

    if (!tipAmount || Number(tipAmount) <= 0) {
      setError("Please enter a valid tip amount");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    setExplorerLink(null);

    try {
      // Remove @ symbol if user included it
      const cleanUsername = twitterUsername.replace(/^@/, "");
      
      // Step 1: Create wallet for Twitter user
      const response = await fetch('/api/wallets/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          twitterUsername: cleanUsername
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create wallet');
      }

      const data = await response.json();
      
      if (!data.success || !data.wallet) {
        throw new Error('Invalid response from server');
      }

      // Step 2: Transfer SOL to the recipient wallet
      const txn = await userWallet.send(data.wallet.address, "sol", tipAmount);
      
      console.log("Transfer completed:", txn);
      
      // Handle transaction response
      let txnHash = typeof txn === 'string' ? txn : txn.hash || txn.transactionId;
      
      if (!txnHash && typeof txn === 'object') {
        for (const [, value] of Object.entries(txn)) {
          if (typeof value === 'string' && value.length > 40) {
            txnHash = value;
            break;
          }
        }
      }
      
      if (!txnHash) {
        throw new Error('No transaction hash received');
      }
      
      const link = `https://solscan.io/tx/${txnHash}?cluster=devnet`;
      setExplorerLink(link);
      
      setSuccess(`Successfully tipped ${tipAmount} SOL to @${cleanUsername}!`);
      setTwitterUsername("");
      setTipAmount("0.01");
      
      console.log("Transfer successful:", link);
    } catch (error) {
      console.error("Error processing tip:", error);
      setError(`Failed to process tip: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAmountChange = (amount: string) => {
    setTipAmount(amount);
  };

  if (!userWallet) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Tip Twitter Creator</h3>
          <p className="text-gray-600">Please connect your wallet first to start tipping</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Send a Tip</h3>
        <p className="text-gray-600">Support your favorite creators with SOL</p>
      </div>

      <form onSubmit={handleTip} className="space-y-4">
        {/* Twitter Username Input */}
        <div>
          <label htmlFor="twitter-username" className="block text-sm font-medium text-gray-700 mb-2">
            Twitter Username
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">@</span>
            <input
              type="text"
              id="twitter-username"
              value={twitterUsername}
              onChange={(e) => setTwitterUsername(e.target.value)}
              placeholder="username"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              disabled={isProcessing}
            />
          </div>
        </div>

        {/* USDC to SOL Converter */}
        <USDCToSOLConverter onAmountChange={handleAmountChange} />

        {/* Tip Amount Input */}
        <div>
          <label htmlFor="tip-amount" className="block text-sm font-medium text-gray-700 mb-2">
            Tip Amount (SOL)
          </label>
          <div className="relative">
            <input
              type="number"
              id="tip-amount"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
              placeholder="0.01"
              step="0.001"
              min="0.001"
              className="w-full pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              disabled={isProcessing}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
              SOL
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-700 text-sm font-medium">{success}</p>
            </div>
            {explorerLink && (
              <a
                href={explorerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 text-xs hover:underline flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View transaction on Solscan →
              </a>
            )}
          </div>
        )}

        {/* Tip Button */}
        <button
          type="submit"
          disabled={isProcessing || !twitterUsername.trim() || !tipAmount || Number(tipAmount) <= 0}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              Tip {twitterUsername ? `@${twitterUsername.replace(/^@/, "")}` : "Creator"}
            </>
          )}
        </button>
      </form>

      {/* Info Section */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-blue-600 text-xs">✓</span>
            </div>
            <p>Enter the Twitter username (without @ symbol)</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-blue-600 text-xs">✓</span>
            </div>
            <p>We&apos;ll check if a wallet exists or create one for this Twitter account</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-blue-600 text-xs">✓</span>
            </div>
            <p>Once confirmed, enter the tip amount and send SOL directly</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-blue-600 text-xs">✓</span>
            </div>
            <p>Uses Crossmint&apos;s server API for secure wallet creation</p>
          </div>
        </div>
      </div>
    </div>
  );
} 