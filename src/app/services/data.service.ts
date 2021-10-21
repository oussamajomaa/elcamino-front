import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
// import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
// import { BehaviorSubject, from } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import { filter } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';




@Injectable({
	providedIn: 'root'
})
export class DataService {
	badgeState = new BehaviorSubject(false)
	// private storageReadey = new BehaviorSubject(false)
	constructor(
		private storage: Storage,
		private firestore:AngularFirestore

		) {
		this.init()
		// this.getNotificationNumber()
		this.getNotifNumber()
	}

	init(){
		this.storage.create()
		this.storage.remove('badge')
		
	}

	getNotifNumber(){
		this.firestore.collection('notification').get()
		.subscribe(res => this.storage.set('notification',res.size))

	}

	
	getNotification(){
		// get all notifications
		return this.firestore.collection('notification').snapshotChanges(["added"])

		// // get notifications according to "category"
		// return this.firestore.collection('notification',ref => ref.where('category','==','Formation')).snapshotChanges(["added"])
	}


	changeState(){
		return this.badgeState.value
	}

























	// init(){
	// 	// this.storage.defineDriver(CordovaSQLiteDriver)
	// 	this.storage.create()
	// 	this.storage.remove('badge')
	// 	// this.storage.set('badge',3)
	// 	// this.storage.get('badge').then(res => console.log('badge',res))
	// 	// this.storageReadey.next(true)
	// }

	// getNotificationNumber(){
	// 	// this.firestore.collection('notification').snapshotChanges(["added"])
	// 	// .subscribe(res => console.log('length ',res.length))
	// }
	
	// getData(){
	// 	return this.storageReadey.pipe(filter(ready => ready),
	// 		switchMap(_=> {
	// 			return from(this.storage.get(storage_key)) || []
	// 		})
	// 	)
	// 	this.storage.get(storage_key) || []
	// }

	
	// async addData(item){
	// 	const storeData = await this.storage.get(storage_key) || []
	// 	storeData.push(item)
	// 	return this.storage.set(storage_key,storeData)
	// }

	// async removeItem(index){
	// 	const storeData = await this.storage.get(storage_key) || []
	// 	storeData.splice(index,1)
	// 	return this.storage.set(storage_key,storeData)
	// }
	// async clearData(){
	// 	return this.storage.clear()
	// }
}