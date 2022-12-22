// require("@metamask/legacy-web3");

// //const { web3 } = window;
//nconst selectedAddress = web3.eth.defaultAccount;

const HDWalletProvider = require("truffle-hdwallet-provider");

const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

require("dotenv").config();

// const OPTIONS = {
//     defaultBlock: 'latest',
//     transactionConfirmationBlocks: 1,
//     transactionBlockTimeout: 8
// }
const provider = new HDWalletProvider(process.env.mnemonic, process.env.link);

const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attemping to deploy contract to accounts: ", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: "0x" + compiledFactory.bytecode })
    .send({ from: accounts[0] });

  console.log("Contract deploy to accounts: ", result.options.address);
  console.log(" Contracted created..!");

  async function verify(contractAddress, args) {
    console.log("Verifying Contract...");
    try {
      //catch any error thrown in the verify section if verification doesn't work
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
      });
    } catch (e) {
      if (e.message.toLowerCase().includes("already verified!!...")) {
        console.log("Contract Already Verified!!..");
      } else {
        console.log(e);
      }
    }
  }
};

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
