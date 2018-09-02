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
		return new Promise<any>((resolve, reject)=>{
			this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password).then((user : firebase.auth.UserCredential)=>{
				console.log(user.user)
				resolve(user);
			}).catch(e=>reject(e));
		})
	}

	logout() {
		return new Promise<boolean>((resolve, reject)=>{
			this.afAuth.auth.signOut().then(()=>{
				resolve(true);
			}).catch(e=>{
				resolve(false);
			})
		})
	}

	/** Registers a user by email/password
	* @param data {Object} - an object containing an email and password property
	*/
	register(data : LoginFormData){
		return new Promise<any>((resolve, reject) => {
			this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
			.then(res => resolve(res), err => reject(err))
		})
	}
}