import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

import { Storage } from '@ionic/storage-angular'
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';


@Component({
	selector: 'app-notification',
	templateUrl: './notification.page.html',
	styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
	notifications = 0
	storageNumber = 0
	difference = 0
	id:number=0
	badgeState:boolean
	constructor(
		private platform: Platform,
		private routerOutlet: IonRouterOutlet,
		private storage: Storage,
		private dataService:DataService,
		private router:Router
	) {
		this.platform.backButton.subscribeWithPriority(-1, () => {
			if (!this.routerOutlet.canGoBack()) {
				App.exitApp();
			}
		});		
		this.badgeState = this.dataService.changeState()
		this.dataService.badgeState.next(!this.badgeState)
		if (this.dataService.changeState()) console.log('true')
		else console.log('false');
		
		
		console.log(this.badgeState);
	}

	ngOnInit() {
		
		
		this.storage.get('notification').then(res => {
			this.notifications = res
			console.log('Nombre de notification dans la base de données', this.notifications);
			this.storage.get('badge').then(res => {
				this.storageNumber = res || 0
				console.log('Nombre de notification dans le localStorage', this.storageNumber);
				this.difference = this.notifications - this.storageNumber
				console.log('Différence entre les deux ', this.difference);
			})
		})
	}

	// navigateToCours(){
	// 	this.router.navigate(["nav/cours"],{queryParams:{id:this.badgeState}})
	// }
}
