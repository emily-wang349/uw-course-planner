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

		super(data.id || Utils.random('user-'));
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
		return this.removeIterableProp(this.plans, plan);
	}

	getPlanById(id){
		return this.getIterablePropById(this.plans, id);
	}

	toPlainObject(){
		// let plainPlans = Object.assign
		let plainObj = Object.assign({}, this);
		plainObj.plans = this.plans.map(plan=>{
			return plan.toPlainObject();
		});
		return plainObj;
	}
}

module.exports = User;