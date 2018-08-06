const Model = require('./Model');

class Plan extends Model {
	constructor(json){
		let data = json || {};
		this.data = data;
	}

	static fromJson(json){
		return new Plan(json);
	}
}

module.exports = Plan;