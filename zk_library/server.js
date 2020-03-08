const express = require('express')
const Web3 = require("web3");
const fs = require("fs");
const url = "http://localhost:8545";
const web3 = new Web3(new Web3.providers.HttpProvider(url));

AgeVerifier = require("./verify/build/contracts/AgeVerifier.json");
PasswordVerifier = require("./verify/build/contracts/PasswordVerifier.json");
let ageVerifier, passwordVerifier, accounts;


const { generate_age_proof, generate_password_proof, get_hash } = require('./zklib')
const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/age/proof/', async (req,res) => {

    let age = req.param("age");
    let agebar = req.param("agebar");
    let proof = await generate_age_proof(age, agebar);
    res.json(proof);
})

app.get('/password/hash/',async (req,res) => {

    let password = req.param("password");
    let hash = await get_hash(password);
    console.log(hash);
    res.json({hash:hash});
})

app.get('/password/proof/',async (req,res) => {

    let password = req.param("password");
    let password_hash = req.param("passwordhash");
    let proof = await generate_password_proof(password, password_hash);
    res.json(proof);

})

app.get("/age/verify", async (req, res) => {

    let proof_string = req.param("ageproof");
    let age_proof = JSON.parse(proof_string);
    await getContracts();
    accounts = await web3.eth.getAccounts();
    console.log(accounts);
    var result  = await ageVerifier.methods.verifyTx(age_proof["proof"]["a"],age_proof["proof"]["b"],age_proof["proof"]["c"],age_proof["inputs"]).send({
        from:accounts[0],gas:600000 
      }).on("receipt", receipt => {
        console.log("added");
        console.log(receipt);
        console.log(receipt["events"]["Verified"]["returnValues"][0]);
        if(receipt.logsBloom != "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000") {
            res.json(true)
        }else{
            res.json(false)
        }
      });
})


app.get("/password/verify", async (req, res) => {

    let proof_string = req.param("passproof");
    let password_proof = JSON.parse(proof_string);
    await getContracts();
    accounts = await web3.eth.getAccounts();
    console.log(accounts);
    var result  = await passwordVerifier.methods.verifyTx(password_proof["proof"]["a"],password_proof["proof"]["b"],password_proof["proof"]["c"],password_proof["inputs"]).send({
        from:accounts[0],gas:600000 
      }).on("receipt", receipt => {
        console.log("added");
        console.log(receipt);
        console.log(receipt["events"]["Verified"]["returnValues"][0]);
        if(receipt.logsBloom != "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000") {
            res.json(true)
        }else{
            res.json(false)
        }
        // }
        // res.json(receipt["events"]["Verified"]["returnValues"][0] == "Transaction successfully verified."? true:false );
      });
})






async function getContracts() {
    console.log("Retrieving contract information...")
    let chainId = await web3.eth.net.getId()
    ageVerifier = new web3.eth.Contract(AgeVerifier.abi, AgeVerifier["networks"][chainId.toString()]["address"]);
    passwordVerifier = new web3.eth.Contract(PasswordVerifier.abi, PasswordVerifier["networks"][chainId.toString()]["address"]);
}


app.listen(3000, () =>{
    console.log(`Server started.`)
})