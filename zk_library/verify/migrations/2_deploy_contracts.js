const AgeVerifier = artifacts.require("AgeVerifier");
const PasswordVerifier = artifacts.require("PasswordVerifier");

module.exports = function(deployer) {
  deployer.deploy(AgeVerifier);
  deployer.deploy(PasswordVerifier);
};
