
const AgeVerifier = artifacts.require('AgeVerifier');
const PasswordVerifier = artifacts.require('PasswordVerifier');
const age_proof = require("../../age/proof.json");
const password_proof = require("../../password/proof.json");
// console.log(proof);
contract('AgeVerifier', (accounts) => {
    let AgeVerifierInstance;
    let PasswordVerifierInstance;
    let creator;


    before(async () => {
        AgeVerifierInstance = await AgeVerifier.deployed();
        PasswordVerifierInstance = await PasswordVerifier.deployed();
        
    })

    it('should be able to deploy', async () => {

        // assert.equal(dummy, 1, "not deployed correctly");
        // assert.notEqual(CompoundDAIMarketInstance.address, "0x0000000000000000000000000000000000000000");
    });


    
    
    it("should verify age correctly", async () => {

        verification_status = await AgeVerifierInstance.verifyTx(age_proof["proof"]["a"],age_proof["proof"]["b"],age_proof["proof"]["c"],age_proof["inputs"], {from:accounts[0], gas: 4000000});
        // console.log(verification_status);
        console.log(verification_status["logs"]);

        
    });it("should verify password correctly", async () => {

        verification_status = await PasswordVerifierInstance.verifyTx(password_proof["proof"]["a"],password_proof["proof"]["b"],password_proof["proof"]["c"],password_proof["inputs"], {from:accounts[0], gas: 4000000});
        // console.log(verification_status);
        console.log(verification_status["logs"]);

        
    });

    
   
})