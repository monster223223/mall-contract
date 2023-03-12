const BigNumber = web3.utils.BN;

// ARTIFACTS
const GEM = artifacts.require("GEM");

// Leave empty for tests and testnet, set to Gnosis Safe for mainnet deployment
const GOVERNANCE_WALLET = '';

module.exports = async (deployer, network, accounts) => {
    // In local test, just for testing purpose, use accounts[1] as governance address 
    let governance = (GOVERNANCE_WALLET) ? GOVERNANCE_WALLET : accounts[1];

    await deployer.deploy(GEM, governance);

    let gem = await GEM.deployed();
    console.log("GEM token:", gem.address);
};
