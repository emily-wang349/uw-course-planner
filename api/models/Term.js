const Utils = require('./../utils')

class Term {
	constructor(data){
		data = data || {};
		this.courses = data.courses || [];
		this.id = data.id || Utils.random('term-');
	}

	equals(term){
		if(!(term instanceof Term)) throw new TypeError("Expected instance of Term, got " + typeof term);
		return term.id === this.id;
	}

	toPlainObject(){
		return Object.assign({}, this);
	}
}

module.exports = Term;