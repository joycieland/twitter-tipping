"use client";

import { useState } from "react";
import { useWallet } from "@crossmint/client-sdk-react-ui";

interface TransferFundsProps {
  recipientWallet: string | null;
  tipAmount: string;
  onTransferComplete?: (txnHash: string) => void;
}

export function TransferFunds({ recipientWallet, tipAmount, onTransferComplete }: TransferFundsProps) {
  const { wallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [txnHash, setTxnHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleTransfer() {
    if (!wallet) {
      setError("Please connect your wallet first");
      return;
    }

    if (!recipientWallet) {
      setError("No recipient wallet address available");
      return;
    }

    if (!tipAmount || Number(tipAmount) <= 0) {
      setError("Invalid tip amount");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Transfer SOL to the recipient wallet
      const txn = await wallet.send(recipientWallet, "sol", tipAmount);
      
      console.log("Raw transaction response:", txn);
      console.log("Transaction type:", typeof txn);
      console.log("Transaction keys:", Object.keys(txn));
      
      // Handle both string and object responses
      let txnHash = typeof txn === 'string' ? txn : txn.hash || txn.transactionId;
      
      // If still no hash, try to stringify and extract from the object
      if (!txnHash && typeof txn === 'object') {
        console.log("Full transaction object:", JSON.stringify(txn, null, 2));
        // Try to find any property that looks like a hash (long string)
        for (const [key, value] of Object.entries(txn)) {
          if (typeof value === 'string' && value.length > 40) {
            txnHash = value;
            console.log(`Found hash in property ${key}:`, value);
            break;
          }
        }
      }
      
      console.log("Extracted transaction hash:", txnHash);
      
      if (!txnHash) {
        throw new Error('No transaction hash received');
      }
      
      const explorerLink = `https://solscan.io/tx/${txnHash}?cluster=devnet`;
      setTxnHash(explorerLink);
      
      if (onTransferComplete) {
        onTransferComplete(explorerLink);
      }

      console.log("Transfer successful:", txn);
    } catch (err) {
      console.error("Transfer failed:", err);
      setError(`Transfer failed: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  if (!recipientWallet) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Transfer Funds</h3>
        <div className="text-gray-500 text-center py-4">
          Please create a wallet for the Twitter user first
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Transfer Funds</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Recipient:</span>
            <span className="text-xs text-gray-500">
              {recipientWallet.slice(0, 8)}...{recipientWallet.slice(-8)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Amount:</span>
            <span className="text-sm font-semibold text-gray-800">{tipAmount} SOL</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {txnHash && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-600 text-sm font-medium">Transfer successful!</p>
            <a
              href={txnHash}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 text-xs hover:underline"
            >
              View transaction on Solscan →
            </a>
          </div>
        )}

        <button
          onClick={handleTransfer}
          disabled={isLoading || !wallet}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Transferring...
            </>
          ) : (
            `Send ${tipAmount} SOL`
          )}
        </button>
      </div>

      <div className="mt-4 text-gray-500 text-xs">
        <p>• This will transfer {tipAmount} SOL to the Twitter user&apos;s wallet</p>
        <p>• Transaction will be visible on Solana blockchain</p>
        <p>• You can view the transaction on Solscan</p>
      </div>
    </div>
  );
} 