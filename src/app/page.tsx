"use client";

import { useAuth } from "@crossmint/client-sdk-react-ui";
import { AuthButton } from "../components/AuthButton";
import { WalletInfo } from "../components/WalletInfo";
import { WalletBalance } from "../components/WalletBalance";
import { TippingForm } from "../components/TippingForm";
import { PWAInstallPrompt } from "../components/PWAInstallPrompt";

export default function Home() {
  const { jwt, user } = useAuth();

  // Show login page if not authenticated
  if (!jwt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Logo and Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Twitter Tipping
            </h1>
            <p className="text-gray-700 text-lg">
              Send crypto tips to your favorite creators
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Welcome! 🚀
              </h2>
              <p className="text-gray-600">
                Connect your wallet to start tipping
              </p>
            </div>

            <AuthButton />

            {/* Features */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                Instant wallet creation
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                Secure SOL transfers
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                Mobile-friendly
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              Powered by Crossmint • Built with Next.js
            </p>
          </div>
        </div>
        
        <PWAInstallPrompt />
      </div>
    );
  }

  // Show main app after authentication
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Twitter Tipping
          </h1>
          <p className="text-gray-700">
            Welcome back, {user?.email || "User"}! 👋
          </p>
        </div>

        {/* App Content */}
        <div className="space-y-6">
          <WalletInfo />
          <WalletBalance />
          <TippingForm />
        </div>
      </div>
      
      <PWAInstallPrompt />
    </div>
  );
}
