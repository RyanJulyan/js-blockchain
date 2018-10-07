
	// Public
	module.exports = transaction;

	function transaction(fromAddress, toAddress, data, amount){
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.data = data;
		this.amount = amount;
	}
