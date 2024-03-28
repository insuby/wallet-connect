import * as React from "react";
import { walletConnectAdapter } from "./walletAdapter";
import { WalletProvider, useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";

const App: React.FC = () => {
  const [, reload] = React.useState<{}>({});
  const [signature, setSignature] = React.useState<string>("");

  const { wallet, address, connected, select, connect, disconnect, signMessage, signTransaction } = useWallet();

  const connectWalletConnectHandler = async () => {
    try {
      select("WalletConnect" as unknown as any);
      await connect();
    } catch (error) {
      console.log("disconnect:" + error);
    }
  };

  const signMessageHandler = async () => {
    try {
      const signature = await signMessage("hello world");
        console.log(signature)
      setSignature(signature);
    } catch (error) {
      console.log("signTransaction:" + error);
    }
  };

  return (
      <div>
        <div>{address || "Not connected"}</div>
        <button onClick={connectWalletConnectHandler}>Tron link</button>
        <button onClick={connectWalletConnectHandler}>Wallet connect</button>
        <button onClick={signMessageHandler}>Sign message</button>
        <div>{signature || "No data"}</div>
      </div>
  );
};

const onError = (error: any) => {
  console.log("onError:" + error);
};

export default () => (
    <WalletProvider adapters={[walletConnectAdapter]} onError={onError}>
      <App />
    </WalletProvider>
);
