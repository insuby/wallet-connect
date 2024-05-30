// @ts-nocheck
import * as React from "react";
import {useWallet, WalletProvider} from "@tronweb3/tronwallet-adapter-react-hooks";
import {TronLinkAdapter, TronLinkAdapterName} from "@tronweb3/tronwallet-adapter-tronlink";
import * as TronWeb from "tronweb/dist/TronWeb";
import {WalletConnectAdapter, WalletConnectWalletName} from "@tronweb3/tronwallet-adapter-walletconnect";
import {TOKEN_ABI} from "./tron/contract/tokenAbi";
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

const convertToHex = (address: any) => {
    return tronWeb.address.toHex(address).replace(/^41/, '0x');
};

const App: React.FC = () => {
    const [signature, setSignature] = React.useState<string>("");
    const {wallet, address, connected, select, connect, disconnect, signMessage, signTransaction} = useWallet();

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
            //
            // const parameter = [
            //     {
            //         value: true,
            //         type: 'bool',
            //     },
            //     {
            //         value: Date.now(),
            //         type: 'uint256',
            //     },
            //     {
            //         value: tronWeb.toBigNumber(100).toString() * 10 ** 6,
            //         type: 'uint256',
            //     },
            //     {
            //         value: tronWeb.toBigNumber(20).toString() * 10 ** 6,
            //         type: 'uint256',
            //     },
            //     {
            //         value: tronWeb.toBigNumber(2).toString() * 10 ** 6,
            //         type: 'uint256',
            //     },
            //     {
            //         value: tronWeb.address.toHex('TRnyDbytxz6EEXPWvag1pwY1uvm88zMfJg'),
            //         type: 'address',
            //     },
            //     {
            //         value: tronWeb.address.toHex('TGi7C537KPDgoa1Uewd1KvrFbHdFNi8vGu'),
            //         type: 'address',
            //     },
            //     {
            //         value: tronWeb.address.toHex('TTDFqTFHcFw3bZfXDi64rBmc2qTwNenhrT'),
            //         type: 'address',
            //     },
            //     {
            //         value: tronWeb.address.toHex('TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj'),
            //         type: 'address',
            //     },
            //     {
            //         value: 'terms',
            //         type: 'string',
            //     },
            // ]
            //
            // const unSignedTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
            //     tronWeb.address.toHex('TLX7Kon9TPP9SdKMm249o9VJ6F1aAriNZw'),
            //     "createDeal",
            //     {callValue: 0},
            //     parameter,
            //     tronWeb.address.toHex(address),
            // );
            //
            // console.log(tronWeb.contract(ABI, 'TLX7Kon9TPP9SdKMm249o9VJ6F1aAriNZw'))
            //
            // const signedTransaction = await tronLinkAdapter.signTransaction(unSignedTransaction.transaction);
            // const result = await tronWeb.trx.sendRawTransaction(signedTransaction);
            // // console.log(result)
            // // setSignature(signedTransaction.signature[0]);

            const parameter = [
                {type: 'address', value: 'TLX7Kon9TPP9SdKMm249o9VJ6F1aAriNZw'},
                {type: 'uint256', value: 1000000000}
            ]
            const unSignedTransaction = await tronWeb.transactionBuilder.triggerSmartContract(
                tronWeb.address.toHex('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'),
                "transfer(address,uint256)",
                // "approve(address,uint256)",
                { callValue: 0 },
                parameter,
                tronWeb.address.toHex(address),
            );
            const signedTransaction = await walletConnectAdapter.signTransaction(unSignedTransaction.transaction);

            const result = await tronWeb.trx.sendRawTransaction(signedTransaction);

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

const onError = (error: any) => {
    console.log("onError:" + error);
};

export default () => (
    <WalletProvider
        adapters={[walletConnectAdapter, tronLinkAdapter]}
    >
        <App/>
    </WalletProvider>
);


//
// const newDeal = {
//     isSellerRequest: true,
//     dealId: 1,
//     amount: 1000000000, // Example amount, adjust as needed
//     disputeFee: 10000000, // Example dispute fee, adjust as needed
//     successFee: 5000000, // Example success fee, adjust as needed
//     buyer: convertToHex('TRnyDbytxz6EEXPWvag1pwY1uvm88zMfJg'), // Example buyer address, replace with actual
//     seller: convertToHex('TGi7C537KPDgoa1Uewd1KvrFbHdFNi8vGu'), // Example seller address, replace with actual
//     garant: convertToHex('TTDFqTFHcFw3bZfXDi64rBmc2qTwNenhrT'), // Example garant address, replace with actual
//     token: convertToHex('TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj'), // Example token address, replace with actual
//     agents: [
//         { agent: convertToHex('TRnyDbytxz6EEXPWvag1pwY1uvm88zMfJg'), fee: 1000000 } // Example agent and fee, adjust as needed
//     ],
//     terms: 'Example deal terms' // Example terms, replace with actual
// };