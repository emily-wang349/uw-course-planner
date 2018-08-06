const Model = require('./Model');
const Term = require('./Term');
const Utils = require('./../utils')

/** Plan model 
 * id
 * name
 * terms
 */
class Plan extends Model {
	constructor(data){
		super();
		this.terms = data.terms || [];
		this.name = data.name || "";
		this.id = data.id || utils.random();
		this._state = {
			_currentTerm: 0
		};
	}

	static fromJson(json){
		return new Plan(JSON.parse(json));
	}

	addTerm(term, index){
		if(!(term instanceof Term)) throw new TypeError("Expected instance of Term, got " + typeof term);
		if(index){
			this.data.terms.splice(index, 0, term);
		} else {
			this.data.terms.push(term);
		}
	}

	removeTerm(term){
		if(typeof term === "string"){

		} else if (term instanceof Term){

		}
	}

	*nextTerm(){
		if(this._state._currentTerm >= this.terms.length) return;
		yield this.terms[this._state._currentTerm++]; 
	}
}

module.exports = Plan;