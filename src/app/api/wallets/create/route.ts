import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { twitterUsername } = await request.json();

    if (!twitterUsername) {
      return NextResponse.json(
        { error: 'Twitter username is required' },
        { status: 400 }
      );
    }

    // Use Crossmint's server API to create a wallet for the Twitter user
    const serverApiKey = 'sk_production_65wNqkXRyCKcNGiK7AGcxk4YzGYHPsKDG8YFMXsuAYw7YmTVoYnaEurSLjhkNzUR7A3kFFFS5z2vVEwRspM9hDqxmeJnqXirFLDXVp1nBQt5PsNje5Xw7REgmBbX431K9ymNYG4RAoTLDpEX3vz4WhZaD42Styc4BaXpBoGoritXi6ap8oZQyykXpupXN6VbzJVEoQ6QUiDtA12qpa9X3wui';
    
    if (!serverApiKey) {
      console.error('CROSSMINT_SERVER_API_KEY not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create a Solana smart wallet using Crossmint's server API
    const response = await fetch('https://www.crossmint.com/api/2025-06-09/wallets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': serverApiKey,
      },
      body: JSON.stringify({
        chainType: 'solana',
        type: 'smart',
        config: {
          adminSigner: {
            type: 'api-key'
          }
        },
        owner: `twitter:${twitterUsername}`
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Crossmint API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to create wallet via Crossmint API' },
        { status: response.status }
      );
    }

    const walletData = await response.json();
    
    return NextResponse.json({
      success: true,
      wallet: {
        address: walletData.address,
        chain: walletData.chainType,
        createdAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error creating wallet:', error);
    return NextResponse.json(
      { error: 'Failed to create wallet' },
      { status: 500 }
    );
  }
} 