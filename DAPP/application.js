//let abi = 'cred.json';

async function createMetaMaskDapp() {
  try {
    // Demande à MetaMask l'autorisation de se connecter
    const addresses = await ethereum.enable();
    const address = addresses[0];
    // Connection au noeud fourni par l'objet web3
    const provider = new ethers.providers.Web3Provider(ethereum);
    return (dapp = { address, provider });
    console.log(dapp);
  } catch (err) {
    // Gestion des erreurs
    console.error(err);
  }
}
async function Account() {
  await createMetaMaskDapp();
  let objectWallet = { balance: "", blockNumbers: "", gasPrice: "" };
  ethsInWallet = dapp.provider.getBalance(dapp.address).then((balance) => {
    let etherString = ethers.utils.formatEther(balance);
    console.log("Balance: " + etherString);
    console.log(typeof etherString);
    return etherString;
  });
  let lastBlock = dapp.provider.getBlockNumber().then((blockNumber) => {
    console.log("Current block number: " + blockNumber);
    return blockNumber;
  });
  let gasPrice = dapp.provider.getGasPrice().then((gasPrice) => {
    // gasPrice is a BigNumber; convert it to a decimal string
    gasPriceString = gasPrice.toString();
    console.log("Current gas price: " + gasPriceString);
    return gasPriceString;
  });
  console.log(ethsInWallet);
  objectWallet.balance = await ethsInWallet;
  objectWallet.blockNumbers = await lastBlock;
  objectWallet.gasPrice = await gasPrice;
  console.log(objectWallet);
  return objectWallet;
  //return await Promise.resolve(Strings)
}
let abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "cred",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "hashs",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "url",
        type: "string",
      },
    ],
    name: "produireHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "dev",
        type: "bytes32",
      },
    ],
    name: "remettre",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "destinataire",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
async function instanceContract() {
  await createMetaMaskDapp();
  let contractAddress = document.getElementById("contractAddress").value;
  if (contractAddress.substr(0, 2) == "0x") {
    contractAddress = contractAddress.substr(2);
  }
  let provider = ethers.getDefaultProvider("ropsten");
  contractCredibility = new ethers.Contract(
    "0x" + contractAddress,
    abi,
    dapp.provider.getSigner()
  );
  let myContract = await contractCredibility.cred(dapp.address);
  document.getElementById("devoirURL").parentElement.className = "";

  console.log(myContract);
}
console.log(instanceContract());

async function remettreDevoir() {
  let url = document.getElementById("devoirURL").value;
  let urlHash = await contractCredibility.produireHash(url);
  console.log("Condensat de l'url du devoir: " + urlHash);

  //dapp.provider
  let rank = await contractCredibility.remettre(urlHash);
  console.log("Le devoir #" + rank + "a été remis");
}
