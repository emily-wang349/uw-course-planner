class Term {
	constructor(id){

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