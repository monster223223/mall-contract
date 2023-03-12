require("ts-node/register");
require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");

function getProvider(network) {
    let url;
	switch(network){
        case "bsc":
            url = `https://bsc-dataseed.binance.org/`;
            break;
        case "bsctest":
            url = `https://data-seed-prebsc-1-s1.binance.org:8545/`;
            break;
        default:
            url = `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
	}
    return new HDWalletProvider(process.env.KEY_MNEMONIC, url);

}

module.exports = {
    plugins: ["truffle-contract-size", "truffle-plugin-verify", "solidity-coverage"],

    test_file_extension_regexp: /.*\.ts$/,

    api_keys: {
        etherscan: process.env.ETHERSCAN_API_KEY,
        bscscan: process.env.BSCSCAN_API_KEY,
    },

    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
        },
        rinkeby: {
            provider: () => getProvider("rinkeby"),
            network_id: 4, 
            gasPrice: 20 * 1000000000, 
        },
        mainnet: {
            provider: () => getProvider("mainnet"),
            network_id: 1, 
            gasPrice: 60 * 1000000000,
        },
        // mainnet: {
        //     provider: () => getProvider("mainnet"),
        //     network_id: 1, 
        //     gasPrice: 60 * 1000000000,
        // },
        bsctest: {
            provider: () => getProvider("bsctest"),
            network_id: 97,
            gasPrice: 20 * 1000000000, 
        },
        bsc: {
            provider: () => getProvider("bsc"),
            network_id: 56,
            gasPrice: 20 * 1000000000, 
        },
    },
    compilers: {
        solc: {
            version: "0.8.4",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 20000,
                },
            },
        },
    },
};
