const Model = require('./Model');
const Plan = require('./Plan');
const Utils = require('./../utils')

/** User model 
 * id
 * username
 * plans
 */
class User extends Model {
	constructor(data){
		data = data || {};

		super();
		this.id = data.id || Utils.random();
		this.username = data.username || "";
		this.plans = data.plans || [];

		for(let i = 0; i < this.plans.length; i++){
			this.plans[i] = new Plan(this.plans[i]);
		}
	}

	static fromJson(json){
		return new User(JSON.parse(json));
	}

	addPlan(plan, index){
		if(!(plan instanceof Plan)) throw new TypeError("Expected instance of Plan, got " + typeof plan);
		if(index){
			this.plans.splice(index, 0, plan);
		} else {
			this.plans.push(plan);
		}
	}

	removePlan(plan){
		if(typeof plan === "string"){

		} else if (plan instanceof Plan){

		}
	}
}

module.exports = User;