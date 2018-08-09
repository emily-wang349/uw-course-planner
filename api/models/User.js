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

	_removePlanById(strId){
		for(let i = 0; i < this.plans.length; i++){
			if(this.plans[i].id === strId){
				this.plans.splice(i, 1);
				return true;
			}
		}
		return false;
	}

	removePlan(plan){
		if(typeof plan === "string" || typeof plan === "number"){
			let planId = "" + plan;
			return this._removePlanById(planId);
		} else if (plan instanceof Plan){
			return this._removePlanById(plan.id);
		}
		throw new TypeError("Expected String, Number, or Plan, got " + typeof plan);
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