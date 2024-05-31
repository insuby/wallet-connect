export const ABI: any[] = [{
    "inputs": [{"name": "dealId", "type": "uint256"}],
    "name": "approveByGuarantee",
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"name": "dealId", "type": "uint256"}],
    "name": "approveBySeller",
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"name": "dealId", "type": "uint256"}],
    "name": "cancel",
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "outputs": [{"type": "uint256"}],
    "inputs": [
        {
            "name": "dealId",
            "type": "uint256"
        },
        {
            "name": "buyer",
            "type": "address"
        },
        {
            "name": "seller",
            "type": "address"
        },
        {
            "name": "guarantee",
            "type": "address"
        },
        {
            "name": "token",
            "type": "address"
        },
        {
            "name": "amount",
            "type": "uint256"
        },
        {
            "name": "guaranteeFeeInNormal",
            "type": "uint256"
        },
        {
            "name": "guaranteeFeeInDispute",
            "type": "uint256"
        },
        {
            "name": "terms",
            "type": "string"
        }
    ],
    "name": "createDeal",
    "stateMutability": "nonpayable",
    "type": "function"
}, {"stateMutability": "Nonpayable", "type": "Constructor"}, {
    "inputs": [{
        "indexed": true,
        "name": "recipient",
        "type": "address"
    }, {"name": "dealId", "type": "uint256"}, {"name": "role", "type": "uint8"}, {
        "name": "initiatorAddress",
        "type": "address"
    }], "name": "Canceled", "type": "Event"
}, {"name": "destroy", "stateMutability": "nonpayable", "type": "function"}, {
    "inputs": [{
        "indexed": true,
        "name": "recipient",
        "type": "address"
    }, {"name": "dealId", "type": "uint256"}], "name": "Done", "type": "Event"
}, {
    "inputs": [{"indexed": true, "name": "recipient", "type": "address"}, {
        "name": "dealId",
        "type": "uint256"
    }], "name": "GuaranteeWaiting", "type": "Event"
}, {
    "inputs": [{"indexed": true, "name": "recipient", "type": "address"}, {
        "name": "dealId",
        "type": "uint256"
    }], "name": "InDispute", "type": "Event"
}, {
    "inputs": [{"indexed": true, "name": "recipient", "type": "address"}, {
        "name": "dealId",
        "type": "uint256"
    }], "name": "InProgress", "type": "Event"
}, {
    "inputs": [{"indexed": true, "name": "recipient", "type": "address"}, {
        "name": "dealId",
        "type": "uint256"
    }], "name": "InReview", "type": "Event"
}, {
    "inputs": [{"name": "dealId", "type": "uint256"}],
    "name": "releaseDeal",
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"indexed": true, "name": "recipient", "type": "address"}, {
        "name": "dealId",
        "type": "uint256"
    }, {"name": "amountToSeller", "type": "uint256"}, {"name": "amount", "type": "uint256"}],
    "name": "Resolved",
    "type": "Event"
}, {
    "inputs": [{"name": "dealId", "type": "uint256"}, {"name": "amountToSeller", "type": "uint256"}],
    "name": "resolveDispute",
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"indexed": true, "name": "recipient", "type": "address"}, {
        "name": "dealId",
        "type": "uint256"
    }], "name": "SellerWaiting", "type": "Event"
}, {"name": "start", "stateMutability": "nonpayable", "type": "function"}, {
    "name": "stop",
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"name": "dealId", "type": "uint256"}],
    "name": "toDispute",
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"name": "dealId", "type": "uint256"}],
    "name": "toReview",
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "outputs": [{"type": "uint256"}],
    "name": "activeDeals",
    "stateMutability": "View",
    "type": "Function"
}, {
    "outputs": [{"name": "id", "type": "uint256"}, {"name": "createdAt", "type": "uint256"}, {
        "name": "terms",
        "type": "string"
    }, {"name": "buyer", "type": "address"}, {"name": "seller", "type": "address"}, {
        "name": "guarantee",
        "type": "address"
    }, {"name": "token", "type": "address"}, {"name": "amount", "type": "uint256"}, {
        "name": "feeInfo",
        "type": "tuple"
    }, {"name": "totalAmount", "type": "uint256"}, {"name": "state", "type": "uint8"}],
    "inputs": [{"type": "uint256"}],
    "name": "deals",
    "stateMutability": "View",
    "type": "Function"
}, {
    "outputs": [{"type": "tuple[]"}],
    "inputs": [{"name": "addr", "type": "address"}, {"name": "roles", "type": "uint8[]"}, {
        "name": "states",
        "type": "uint8[]"
    }, {"name": "offset", "type": "uint256"}, {"name": "limit", "type": "uint256"}],
    "name": "getDeals",
    "stateMutability": "View",
    "type": "Function"
}, {
    "outputs": [{"type": "uint256"}],
    "inputs": [{"name": "addr", "type": "address"}, {"name": "roles", "type": "uint8[]"}, {
        "name": "states",
        "type": "uint8[]"
    }],
    "name": "getDealsCount",
    "stateMutability": "View",
    "type": "Function"
}, {
    "outputs": [{"type": "bool"}],
    "name": "isActive",
    "stateMutability": "View",
    "type": "Function"
}, {"outputs": [{"type": "address"}], "name": "owner", "stateMutability": "View", "type": "Function"}]
