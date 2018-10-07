
	const Block = require("./block");
	const Transaction = require("./transaction");

	// Public
	module.exports = blockchain;

	function blockchain() {
		this.chain = [this.createRootBlock()];
		this.difficulty = 2;
		this.pendingTransactions = [];
		this.miningReward = 1;
	}

	blockchain.prototype.createRootBlock = function() {
		return new Block(Date.now(), [], "-0");
	}

	blockchain.prototype.getLatestBlock = function() {
		return this.chain[this.chain.length - 1];
	}

	blockchain.prototype.minePendingTransactions = function(miningRewardAddress){
		const reward = new Transaction(null, miningRewardAddress, {message:"Verifying"}, this.miningReward);
		this.pendingTransactions.push(reward);
		
		let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
		block.mineBlock(this.difficulty);

		//console.log('Block successfully mined!');
		this.chain.push(block);

		this.pendingTransactions = [];
	}

	blockchain.prototype.createTransaction = function(transaction){
		this.pendingTransactions.push(transaction);
	}

	blockchain.prototype.getBalanceOfAddress = function(address){
		let balance = 0;

		for(const block of this.chain){
			for(const trans of block.transactions){
				if(trans.fromAddress === address){
					balance -= trans.amount;
				}

				if(trans.toAddress === address){
					balance += trans.amount;
				}
			}
		}

		return balance;
	}

	blockchain.prototype.isChainValid = function() {
		for (let i = 1; i < this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.calculateHash()) {
				return false;
			}
		}

		return true;
	}