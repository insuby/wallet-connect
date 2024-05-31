// @ts-nocheck
import * as React from "react";
import {useWallet, WalletProvider} from "@tronweb3/tronwallet-adapter-react-hooks";
import {TronLinkAdapter, TronLinkAdapterName} from "@tronweb3/tronwallet-adapter-tronlink";
import * as TronWeb from "tronweb/dist/TronWeb";
import {WalletConnectAdapter, WalletConnectWalletName} from "@tronweb3/tronwallet-adapter-walletconnect";
import {ABI} from "./tron/contract/abi";

const tronWeb = new TronWeb({
    fullHost: 'https://api.nileex.io',
    // fullHost: 'https://api.trongrid.io',
});

const walletConnectAdapter = new WalletConnectAdapter({
    network: 'Mainnet',
    options: {
        relayUrl: "wss://relay.walletconnect.com",
        projectId: "48b7ae0393332308c1be629127621481",
        metadata: {
            name: "Ascro",
            description: "Ascro",
            url: "https://test.ascro.co",
            icons: ["https://test.ascro.co/favicon.ico"],
        },
    },
    web3ModalConfig: {
        themeMode: "dark",
        themeVariables: {
            "--w3m-z-index": "1000",
        },
    },
});

const tronLinkAdapter = new TronLinkAdapter()

const parameter = [
    {
        value: Date.now(),
        type: 'uint256',
    },
    {
        value: tronWeb.address.toHex('TRnyDbytxz6EEXPWvag1pwY1uvm88zMfJg'),
        type: 'address',
    },
    {
        value: tronWeb.address.toHex('TGi7C537KPDgoa1Uewd1KvrFbHdFNi8vGu'),
        type: 'address',
    },
    {
        value: tronWeb.address.toHex('TTDFqTFHcFw3bZfXDi64rBmc2qTwNenhrT'),
        type: 'address',
    },
    {
        value: tronWeb.address.toHex('TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj'),
        type: 'address',
    },
    {
        value: tronWeb.toBigNumber(100).toString() * 10 ** 6,
        type: 'uint256',
    },
    {
        value: tronWeb.toBigNumber(20).toString() * 10 ** 6,
        type: 'uint256',
    },
    {
        value: tronWeb.toBigNumber(2).toString() * 10 ** 6,
        type: 'uint256',
    },
    {
        value: 'terms',
        type: 'string',
    },
]

const App: React.FC = () => {
    const [signature, setSignature] = React.useState("");
    const {address, select, connect, signTransaction} = useWallet();

    const connectWalletConnectHandler = async () => {
        try {
            select(WalletConnectWalletName);
            await connect();
        } catch (error) {
            console.log("disconnect:" + error);
        }
    };

    const connectTronLinkHandler = async () => {
        try {
            select(TronLinkAdapterName);
            await connect();
        } catch (error) {
            console.log("disconnect:" + error);
        }
    };

    const signMessageHandler = async () => {
        try {
            tronWeb.setAddress(address);

            const unSignedTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                tronWeb.address.toHex('TBWG31zvPFRvX83PHREU117oeeVyAK2Wqv'),
                'createDeal(uint256,address,address,address,address,uint256,uint256,uint256,string)',
                {
                    feeLimit: 300_000_000,
                    callValue: 0
                },
                parameter,
                tronWeb.address.toHex(address),
            )

            const signedTransaction = await tronLinkAdapter.signTransaction(unSignedTransaction.transaction);
            const result = await tronWeb.trx.sendRawTransaction(signedTransaction);
            setSignature(signedTransaction.signature[0]);
        } catch (error) {
            console.log("signTransaction:" + error);
        }
    };

    return (
        <div>
            <div>{address || "Not connected"}</div>
            <button onClick={connectTronLinkHandler}>Tron link</button>
            <button onClick={connectWalletConnectHandler}>Wallet connect</button>
            <button onClick={signMessageHandler}>Sign message</button>
            <div>{signature || "No data"}</div>
        </div>
    );
};

export default () => (
    <WalletProvider
        adapters={[walletConnectAdapter, tronLinkAdapter]}
        onError={console.log}
    >
        <App/>
    </WalletProvider>
);
