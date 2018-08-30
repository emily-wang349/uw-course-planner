/**
 * Everything to do with plans should go here. All calls to this endpoint must be authenticated
 */

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const Plan = require('./../models/Plan');
const User = require('./../models/User');
const Term = require('./../models/Term');
const ResponseWrapper = require('./ResponseWrapper');
const UserDocument = require('./UserDocument');

const firestore = admin.firestore()

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

/** 
 * =========================
 * ---------- GET ----------
 * =========================
 */

/** GET - /plans
 * This endpoint should list all the plans IDs associated with the current user
 */
router.get('/', function(req, res, next) {
	let userId = 'test';
	let userRef = firestore.collection('users').doc(userId);
	userRef.get().then(ref=>{
		return (new ResponseWrapper(res, ref.data(), 'Retrieved plans successfully')).send();
	}).catch(e=>{
		return (new ResponseWrapper(res, e, 'An error occurred', ResponseWrapper.STATUS.SERVER_ERROR)).send();
	})
});

/** GET - /plans/:id
 * Get the details of a plan
 */
router.get('/:id', function(req, res, next){
	let userId = 'test';
	let planId = req.params.id;

	UserDocument.getUser(userId).then(user=>{
		let plan = user.getPlanById(planId);

		if(plan){
			return (new ResponseWrapper(res, plan, 'Plan retrieved successfully')).send();
		}
		return (new ResponseWrapper(res, {}, 'Plan not found', ResponseWrapper.STATUS.NOT_FOUND)).send();
	}).catch(e=>{
		return (new ResponseWrapper(res, e, 'An error occurred', ResponseWrapper.STATUS.SERVER_ERROR)).send();
	})
})

/** GET - /plans/:planId/:termId
 *	Retrieve the term details under the plan
 */
router.get('/:planId/:termId', function(req, res, next){
	let userId = 'test';
	let planId = req.params.planId;
	let termId = req.params.termId;

	UserDocument.getUser(userId).then(user=>{
		let term;
		try {
			term = user.getPlanById(planId).getTermById(termId);
			return (new ResponseWrapper(res, term, 'Term retrieved successfully')).send();
		} catch(e){
			console.error(e);
			return (new ResponseWrapper(
				res, 
				{}, 
				'Term not found', 
				ResponseWrapper.STATUS.NOT_FOUND)
			).send();
		}
	}).catch(e=>{
		return (new ResponseWrapper(
			res, 
			e, 
			'An error occurred', 
			ResponseWrapper.STATUS.SERVER_ERROR)
		).send();
	})
})

/** 
 * ==========================
 * ---------- POST ----------
 * ==========================
 */

/** POST - /plans
 * This endpoint will create a new plan and return the entire User object
 */
router.post('/', function(req, res, next){
	// todo: fix the user id
	let userId = 'test';

	let userDoc = new UserDocument(userId);
	userDoc.get().then(user=>{
		let plan = new Plan();
		user.addPlan(plan)
		userDoc.withRes(new ResponseWrapper(
			res, 
			user, 
			'Plan created successfully', 
			ResponseWrapper.STATUS.CREATED)
		).save();
	})
})

/** POST - /plans/:planId
 * This endpoint creates a new term under the plan
 */
router.post('/:planId', function(req, res, next){
	// todo: fix the user id
	let userId = 'test';
	let planId = req.params.planId;

	let userDoc = new UserDocument(userId);
	userDoc.get().then(user=>{
		try{
			user.getPlanById(planId).addTerm(new Term);

			return userDoc.withRes(new ResponseWrapper(
				res, 
				user, 
				'Term created successfully', 
				ResponseWrapper.STATUS.CREATED)
			).save();
		} catch(e) {
			console.error(e)
			return (new ResponseWrapper(
				res,
				e.toString(),
				'Plan not found',
				ResponseWrapper.STATUS.NOT_FOUND)
			).send();
		}

	})
})


/** 
 * ==========================
 * --------- DELETE ---------
 * ==========================
 */

/** DELETE - /plans/:id
 *	Deletes a plan from the currently logged in user
 */
router.delete('/:id', function(req, res, next){
	let userId = 'test';
	let planId = req.params.id;

	let userDoc = new UserDocument(userId);
	userDoc.get().then(user=>{
		if(user.removePlan(planId)){
			return userDoc.withRes(new ResponseWrapper(
				res, 
				{}, 
				'Removed plan successfully')
			).save();
		} else {
			return (new ResponseWrapper(
				res, 
				{}, 
				'Plan not found',
				ResponseWrapper.STATUS.NOT_FOUND)
			).send();
		}
	})
})

/** DELETE - /plans/:planId/:termId
 * Deletes a term from the currently logged in user
 */
router.delete('/:planId/:termId', function(req, res, next){
	let userId = 'test';
	let planId = req.params.planId;
	let termId = req.params.termId;

	let userDoc = new UserDocument(userId)
	userDoc.get().then(user=>{
		try{
			if(user.getPlanById(planId).removeTerm(termId)){
				return userDoc.withRes(new ResponseWrapper(
					res, 
					{},
					'Term deleted successfully')
				).save();
			} else {
				return (new ResponseWrapper(
					res, 
					{}, 
					'Term not found',
					ResponseWrapper.STATUS.NOT_FOUND)
				).send();
			}
		} catch(e) {
			return (new ResponseWrapper(
				res,
				e.toString(),
				'Term not found',
				ResponseWrapper.STATUS.NOT_FOUND)
			).send();
		}
	})
})

/** 
 * =========================
 * ---------- PUT ----------
 * =========================
 */

/** PUT - /plans/:id
 * Update a plan
 */
router.put('/:id', function(req, res, next){
	res.json('when will it end');
})

module.exports = router;
