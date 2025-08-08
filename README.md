# 🐦 Twitter Tipping App

A web application that allows users to tip their favorite Twitter creators with cryptocurrency. Built with Next.js, Crossmint SDK, and Tailwind CSS.

## Features

- 🔐 Google authentication using Crossmint Auth
- 💰 Automatic wallet creation on login
- 💎 Real-time wallet balance display (SOL & USDC)
- 🐦 Twitter username input for tipping
- 💰 Automatic wallet creation for Twitter users
- 🎨 Beautiful, modern UI with Tailwind CSS
- ⚡ Fast and responsive design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Crossmint API key

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd twitter-tipping
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_CROSSMINT_API_KEY=your_crossmint_client_api_key_here
   CROSSMINT_SERVER_API_KEY=your_crossmint_server_api_key_here
   ```

   To get your Crossmint API keys:
   1. Go to [Crossmint Console](https://console.crossmint.com/)
   2. Create a new project or use an existing one
   3. Go to API Keys section
   4. Create a **client API key** with the following scopes:
      - `users.create`
      - `users.read`
      - `wallets.read`
      - `wallets.create`
      - `wallets:transactions.create`
      - `wallets:transactions.sign`
      - `wallets:balance.read`
      - `wallets.fund`
   5. Create a **server API key** with the following scopes:
      - `wallets.create`
      - `wallets.read`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## How it Works

1. **Authentication**: Users can login with their Google account using Crossmint Auth
2. **Wallet Creation**: A crypto wallet is automatically created on the Base network when users login
3. **Wallet Display**: Users can see their wallet address and balance
4. **Tipping**: (Coming soon) Users will be able to tip Twitter creators with crypto

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Authentication**: Crossmint Auth
- **Wallet**: Crossmint Wallet SDK
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Crossmint providers
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
└── components/
    ├── CrossmintProviders.tsx  # Crossmint SDK providers
    ├── AuthButton.tsx          # Authentication button
    ├── WalletInfo.tsx          # Wallet display component
    ├── WalletBalance.tsx       # Wallet balance display component
    ├── TippingForm.tsx         # Twitter tipping form component
    └── TransferFunds.tsx       # Fund transfer component
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CROSSMINT_API_KEY` | Your Crossmint client API key | Yes |
| `CROSSMINT_SERVER_API_KEY` | Your Crossmint server API key | Yes |

## Next Steps

- [x] Add wallet balance display
- [x] Add Twitter username input
- [x] Implement wallet creation for Twitter users
- [x] Implement fund transfer functionality
- [ ] Integrate with Twitter API for user verification
- [ ] Add transaction history
- [ ] Implement USDC token support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
