import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

interface LoginFormData {
	email: string;
	password: string;
}

@Injectable()
export class AuthenticationService {
	constructor(private afAuth : AngularFireAuth) { }

	login(data : LoginFormData) {
		return new Promise<firebase.auth.UserCredential>((resolve, reject)=>{
			this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password).then(user=>{
				console.log('logged in')
				resolve(user);
			}).catch(e=>reject(e));
		})
	}

	logout() {
		return new Promise<boolean>((resolve, reject)=>{
			this.afAuth.auth.signOut().then(()=>{
				console.log('logged out')
				resolve(true);
			}).catch(e=>{
				resolve(e);
			})
		})
	}

	async getCurrentUser(){
	 	if(!this.afAuth.auth.currentUser) {
	 		throw new Error("User is not authenticated");
	 	}
		return await this.afAuth.auth.currentUser.getIdToken();
	}


	/** Registers a user by email/password
	* @param data {Object} - an object containing an email and password property
	*/
	register(data : LoginFormData){
		return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
			this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
			.then(res => resolve(res), err => reject(err))
		})
	}
}