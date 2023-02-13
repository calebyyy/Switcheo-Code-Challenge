const ethers = require('ethers');
const BN = require('bn.js');

const abi = [
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
const contractAddress = "0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c";
const contract = new ethers.Contract('0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c', abi, provider);

async function getHolders(limit) {
  const holders = [];

  for (let i = 0; i < limit; i++) {
    const balance = await contract.balanceOf(i);
    if (balance.gt(new BN(0))) {
      holders.push({
        address: `0x${i.toString(16).padStart(40, '0')}`,
        balance: balance.toString()
      });
    }
  }

  holders.sort((a, b) => b.balance - a.balance);

  holders.forEach(holder => {
    console.log(`${holder.address}: ${holder.balance}`);
  });
}

getHolders(100);