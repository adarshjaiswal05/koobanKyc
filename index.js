var Tx = require('ethereumjs-tx').Transaction;

const Common = require('ethereumjs-common');


const Web3 = require('web3');



 async function setData(sKey,sHash) {

    const web32 = new Web3(
        new Web3.providers.HttpProvider("https://goerli.infura.io/v3/cd9840c963b54d63b5adaea7eb66d8ac")
    );

    const adminAddress = ""
    const addressETH = "0x00Bc0d911c1cFF25609e170A3831963918fC21b0"

    var ABIETH =[
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "uniqueKey",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "signature",
                    "type": "string"
                }
            ],
            "name": "store",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "User",
                    "type": "address"
                }
            ],
            "name": "whitelistAddress",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "uniqueKey",
                    "type": "string"
                }
            ],
            "name": "retrieveSignature",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ] 

    let contractEth;

    //sAddress,nAmount

    const PrivateKey = "";

    var key = new Buffer.from(PrivateKey, 'hex');

    contractEth = new web32.eth.Contract(ABIETH, addressETH);

    try {

        const gasPrice = await web32.eth.getGasPrice();
        console.log("gasPrice working " + gasPrice)

        const gasPriceHex = web32.utils.toHex(gasPrice);
        console.log("gasPriceHex working " + gasPriceHex)

        const gasLimitHex = web32.utils.toHex(3000000);
        console.log("gasLimitHex working " + gasLimitHex)

        const Id = await web32.eth.net.getId();
        console.log("Id working " + Id)

        let nonce = await web32.eth.getTransactionCount(adminAddress);
        console.log("nonce working " + nonce)

        let data = contractEth.methods.store(sKey,sHash).encodeABI()

        console.log(data + " data working ")

        var tra = {
            from: adminAddress,
            to: addressETH,
            nonce: nonce,
            gasPrice: gasPriceHex,
            gasLimit: gasLimitHex,
            data: data,
            cahinId: Id
        }
        console.log(" tra working " + tra)

        // const bsc_main = Common.default.forCustomChain('mainnet', {
        //     name: 'bnb',
        //     networkId: 56,
        //     chainId: 97
        // }, 'istanbul');


        const tx = new Tx(tra, { 'chain': 'goerli' });

        console.log(tx + "tx working")

        tx.sign(key);

        console.log(" sign working ")

        var stx = tx.serialize();

        console.log( "  stx working ")

        await web32.eth.sendSignedTransaction('0x' + stx.toString('hex'), (err, hash) => {
            if (err) { console.log(err); return; }
            console.log('contract creation tx: ' + hash);
            console.log("<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            console.log("saved " +"  key-> " + sKey + "   hash-> " + sHash + " on kooban Blockchain")
            console.log("<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        });
    } catch (err) {
        console.log(err);
    }
}

async function gethash(uniqueKey) {
	try{
	contractEth.methods.retrieveSignature(uniqueKey).call(function (err, nHash) {
		console.log(nBalance)
	})
 }catch(err){
 console.log(err)
 }
}


setData("10","11223344");
