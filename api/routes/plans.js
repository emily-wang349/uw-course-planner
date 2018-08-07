/**
 * Everything to do with plans should go here. All calls to this endpoint must be authenticated
 */

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const Plan = require('./../models/Plan');
const User = require('./../models/User');

/**
 * Custom middleware to verify users
 */ 
router.use(function(req, res, next){
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
	let userRef = admin.firestore().collection('users').doc(userId);
	userRef.get().then(ref=>{
		res.json(ref.data())
	})
});

/** POST - /plans
 * This endpoint will create a new plan and return it
 */
router.post('/', function(req, res, next){
	let userId =  'test';
	let userRef = admin.firestore().collection('users').doc(userId);
	userRef.get().then(ref=>{
		let user = new User(ref.data());
		res.json(user)
	})
})

/** GET - /plans/:id
 * Get the details of a plan
 */
router.get('/:id', function(req, res, next){
	res.json('haha help me');
})

/** PUT - /plans/:id
 * Update a plan
 */
router.put('/:id', function(req, res, next){
	res.json('when will it end');
})

module.exports = router;
