import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

import { AngularFirestore } from '@angular/fire/compat/firestore';




@Injectable({
	providedIn: 'root'
})
export class DataService {
	
	constructor(
		private storage: Storage,
		private firestore:AngularFirestore

		) {
			this.storage.create()
	}



	getCours(){
		return this.firestore.collection('notification',ref => ref.where('category','==','cours'))
		.snapshotChanges(["added"])
	}

	getEvents(){
		return this.firestore.collection('notification',ref => ref.where('category','==','event'))
		.snapshotChanges(["added"])
	}

	// getStages(){
	// 	return this.firestore.collection('notification',ref => ref.where('category','==','stage'))
	// 	.snapshotChanges(["added"])
	// }



























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
