/**
 * Everything to do with plans should go here. All calls to this endpoint must be authenticated
 */

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const Plan = require('./../models/Plan');
const User = require('./../models/User');
const ResponseWrapper = require('./ResponseWrapper');

const firestore = admin.firestore()
firestore.settings({
	timestampsInSnapshots: true
})

/**
 * Custom middleware to verify users
 */ 
router.use(function(req, res, next){
	// todo: pass user id or something so firebase knows what user we're talking about
	let cookie = req.cookies.session || ""

	return next()
	
	admin.auth().verifySessionCookie(cookie, true).then(decodedClaims =>{
		next();
	}).catch(err=>{
		let error = new Error('Unauthorized');
		error.status = 401;
		return next(error);
	})
})

/** GET - /plans
 * This endpoint should list all the plans IDs associated with the current user
 */
router.get('/', function(req, res, next) {
	let userId = 'test';
	let userRef = firestore.collection('users').doc(userId);
	userRef.get().then(ref=>{
		return (new ResponseWrapper(res, ref.data(), 'Retrieved plans successfully')).send();
	})
});

/** GET - /plans/:id
 * Get the details of a plan
 */
router.get('/:id', function(req, res, next){
	let userId = 'test';
	let planId = req.params.id;

	let userRef = firestore.collection('users').doc(userId);
	userRef.get().then(ref=>{
		let user = new User(ref.data());
		let plan = user.getPlanById(planId);
		if(plan){
			return (new ResponseWrapper(res, plan, 'Plan retrieved successfully')).send();
		}
		return (new ResponseWrapper(res, {}, 'Plan not found', ResponseWrapper.STATUS.NOT_FOUND)).send();
	})
})

router.get('/:planId/:termId', function(req, res, next){
	let userId = 'test';
	let planId = req.params.planId;
	let termId = req.params.termId;

	let userRef = firestore.collection('users').doc(userId);
	userRef.get().then(ref=>{
		let user = new User(ref.data());
		let plan = user.getPlanById(planId);
		if(plan){
			let term = plan.getTermById(termId);
		}
	})
})

/** POST - /plans
 * This endpoint will create a new plan and return the entire User object
 */
router.post('/', function(req, res, next){
	// todo: fix the user id
	let userId =  'test';

	let userRef = firestore.collection('users').doc(userId);
	userRef.get().then(ref=>{
		let user = new User(ref.data());
		let plan = new Plan();
		user.addPlan(plan);
		
		userRef.set(user.toPlainObject(), { merge: true }).then(()=>{
			return (new ResponseWrapper(res, user, 'Added plan successfully', ResponseWrapper.STATUS.CREATED)).send();
		});
	})
})

router.delete('/:id', function(req, res, next){
	let userId = 'test';
	let planId = req.params.id;

	let userRef = firestore.collection('users').doc(userId);
	userRef.get().then(ref=>{
		let user = new User(ref.data());
		if(user.removePlan(planId)){
			userRef.set(user.toPlainObject(), { merge: true }).then(()=>{
				return (new ResponseWrapper(res, user, 'Removed plan successfully')).send();
			})
		} else {
			return (new ResponseWrapper(res, user, 'Plan not found', ResponseWrapper.STATUS.NOT_FOUND)).send();
		}
	})
})


/** PUT - /plans/:id
 * Update a plan
 */
router.put('/:id', function(req, res, next){
	res.json('when will it end');
})

module.exports = router;
