let Utils = {
	random: function(){
		return (Date.now() + Math.floor(Math.random() * 9999999).toString()).padEnd(20, '0');
	}
}

module.exports = Utils;