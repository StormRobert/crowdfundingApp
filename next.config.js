module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 3000,
      network_id: "*", // Match any network id
    },

    goerli: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://goerli.infura.io/v3/c20476be07cf414788352375ae7c4c16`
        ),
      network_id: 5, // goerli id
      gas: 30000000, // goerli has a lower block limit than mainnet
      confirmations: 1, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 8, // # of blocks before a deployment times out  (minimum/default: 50)
    },
  },
};
