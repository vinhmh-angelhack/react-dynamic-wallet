"use client";
import {
  DynamicContextProvider,
  useDynamicContext,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { SafeEvmWalletConnectors } from "@dynamic-labs-connectors/safe-evm";

import { useEffect, useState } from "react";

function BitcoinWalletConnect() {
  const { setShowAuthFlow, user, primaryWallet } = useDynamicContext();
  const [btcAddress, setBtcAddress] = useState(null);

  useEffect(() => {
    if (primaryWallet?.address) {
      setBtcAddress(primaryWallet.address);
    }
  }, [primaryWallet]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-4">Connect Bitcoin Wallet</h1>

      {user ? (
        <div className="text-center">
          <p className="text-lg">Connected to: {btcAddress}</p>
          <DynamicWidget />
        </div>
      ) : (
        <button
          onClick={() => setShowAuthFlow(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Connect Bitcoin Wallet
        </button>
      )}
    </div>
  );
}

// ✅ Ensure DynamicContextProvider wraps the entire app
export default function App() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "0198ae51-52fd-4751-84d3-4a17fd6caf34", // 🔹 Replace with your Dynamic ID
        walletConnectors: [SafeEvmWalletConnectors],
        initialAuthenticationMode: "connect-and-sign",
        debugError: true,
      }}
    >
      {/* <BitcoinWalletConnect />
       */}
      <DynamicWidget />
    </DynamicContextProvider>
  );
}
