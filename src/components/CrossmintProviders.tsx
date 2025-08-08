"use client";

import {
  CrossmintProvider,
  CrossmintAuthProvider,
  CrossmintWalletProvider,
} from "@crossmint/client-sdk-react-ui";

const apiKey = 'ck_production_29pfUp21DjSWmEywQ9Sk3D2Fx7hAc64DkJZueH4NnfW2V3NQkAvFp2FaUvbaKMsZ4tMDuyFdTWNaKFBryLmRx8SJ58SB2rDSJs6zeqkeJQnQWicPWPyxgsXfiLQUBxMGAfYw7T8YthJ6QbmLnm5wihM7KUuN8AMrJyW8Z6GP2gDg1jGhXYcipufUaJzQY1RBA7S1BQ7nztSRoRTomyvcQhd';
if (!apiKey) {
  throw new Error("NEXT_PUBLIC_CROSSMINT_API_KEY is not set");
}

export function CrossmintProviders({ children }: { children: React.ReactNode }) {
  return (
    <CrossmintProvider apiKey={apiKey as string}>
      <CrossmintAuthProvider
        authModalTitle="Twitter Tipping"
        loginMethods={["google", "email"]}
      >
        <CrossmintWalletProvider
          createOnLogin={{
            chain: "solana",
            signer: {
              type: "api-key",
            }
          }}
        >
          {children}
        </CrossmintWalletProvider>
      </CrossmintAuthProvider>
    </CrossmintProvider>
  );
} 