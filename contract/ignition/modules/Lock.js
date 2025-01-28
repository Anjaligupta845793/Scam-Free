// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Web3ScamRegistry", (m) => {
  const Web3ScamRegistry = m.contract("Web3ScamRegistry");

  return { Web3ScamRegistry };
});
