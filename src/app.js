
const Block = require("./block");
const Blockchain = require("./blockchain");
const Transaction = require("./transaction");

let myCoin = new Blockchain();
// the funcation and parameters for transaction(fromAddress, toAddress, data, amount)
myCoin.createTransaction(new Transaction('address1', 'address2',{message:"Save Value"}, 100)); // this can be looped
myCoin.createTransaction(new Transaction('address2', 'address1',{message:"Save Value"}, 50));

myCoin.minePendingTransactions('my-address'); // this does the mining

console.log('\nBalance of my-address is', myCoin.getBalanceOfAddress('my-address')); // this shows reward balance