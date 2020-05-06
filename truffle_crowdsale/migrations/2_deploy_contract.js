// const ERC20 = artifacts.require("ERC20");

// module.exports = function(deployer) {
//   deployer.deploy(ERC20);
// };

const Crowdsale = artifacts.require("Crowdsale");

module.exports = function(deployer) {
  deployer.deploy(Crowdsale);
};
