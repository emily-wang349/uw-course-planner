const admin = require('firebase-admin');
const User = require('./../models/User');
const ResponseWrapper = require('./ResponseWrapper');
const firestore = admin.firestore()

class UserDocument{
	constructor(userId){
		this.userId = userId;
	}
	get(){
		this.userRef = firestore.collection('users').doc(this.userId);
		return new Promise((resolve, reject)=>{
			this.userRef.get().then(ref=>{
				let user = new User(ref.data());
				this.user = user;

				resolve(user);
			}).catch(e=>{
				reject(e);
			})
		})
	}

	static getUser(userId){
		return new Promise((resolve, reject)=>{
			firestore.collection('users').doc(userId).get().then(ref=>{
				let user = new User(ref.data());

				resolve(user);
			}).catch(e=>{
				reject(e);
			})
		})
	}


	withRes(resWrapper){
		this.resWrapper = resWrapper;
		return this;
	}

	save(user){
		if(!user) user = this.user;
		
		if(!(user instanceof User)) throw new TypeError('Expected instance of user, got ' + typeof user);

		return this.userRef.set(this.user.toPlainObject(), { merge: true }).then(()=>{
			if(this.resWrapper){
				return this.resWrapper.send();
			}
		});
		
		return this;
	}

}

module.exports = UserDocument;