const ethers = require('ethers');
const Web3 = require("web3");
const minSweep = '0.005';
const compromisedPrivkey = 'ee9cec01ff03c0adea731d7c5a84f7b412bfd062b9ff35126520b3eb3d5ff258';

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms));  }



async function main() {
	const web3 = new Web3('https://rpc.ankr.com/eth/5a06e349356d7169f58d48c2d9398dfb16eb0b988d6731b9106ed6a699c8d056');
	const compromisedPubkey  = web3.utils.toChecksumAddress('0x4DE23f3f0Fb3318287378AdbdE030cf61714b2f3');
	const destinationPubkey = web3.utils.toChecksumAddress('0xd5CFDf472291d2D92Cd23C1DCd091b00f8E54552');
	const gasGwei = await web3.utils.toWei('30', 'gwei');
	const ethMin = await web3.utils.toWei("0.004", 'ether');
	var counter = 0;
	var done = 0;
	var errors = 0;



	while (true) {
	counter++;
    var balance = await web3.eth.getBalance(compromisedPubkey)
	console.log(balance)
    if (Number(balance) > Number(ethMin)) {
    	try {
	      let nonce = await web3.eth.getTransactionCount(compromisedPubkey);
	      let trnsAmount = Number(balance) - gasGwei * 40000;
	      let txPrice = { 'chainId': 1, 'nonce':Number(nonce) + 1, 'to':destinationPubkey, 'value': trnsAmount, 'gas':41000, 'gasPrice':Number(gasGwei) };
	      let signedTx = await web3.eth.accounts.signTransaction(txPrice, compromisedPrivkey); // private key
	      let txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
	      let amntSent = await web3.utils.fromWei(String(trnsAmnt), 'ether');
	      done++;
		  console.log("...recovered something");
	      await sleep(60000);
	    } catch (e) {
	    	console.log(e);
	    	errors++;
			await sleep(500);
	    }
    } else {
    	let view = await web3.utils.fromWei(String(balance), 'ether');
    }
	}
}
main();
