// var SimpleStorage = artifacts.require("./SimpleStorage.sol");

// module.exports = function(deployer) {
//   deployer.deploy(SimpleStorage);
// };

const marketPlace = artifacts.require("marketPlace");

module.exports = function(deployer) {
  deployer.deploy(marketPlace);
};
