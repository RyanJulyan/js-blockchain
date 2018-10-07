	
	const SHA256 = require("crypto-js/sha256");

	// Public
	module.exports = block;

	function block(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    block.prototype.calculateHash = function() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    block.prototype.mineBlock = function(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        //console.log("BLOCK MINED: " + this.hash);
		
		return this.hash;
    }