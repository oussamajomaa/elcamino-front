import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
// import { Plugins } from '@capacitor/core';
// const { App } = Plugins;
import { App } from '@capacitor/app';

import { Storage } from '@ionic/storage-angular'
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


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
	navigationSubscription

	constructor(
		private platform: Platform,
		private routerOutlet: IonRouterOutlet,
		private storage: Storage,
		private router:Router,
		private dataService:DataService,
	) {
		this.platform.backButton.subscribeWithPriority(-1, () => {
			if (!this.routerOutlet.canGoBack()) {
				App.exitApp();
			}
		});		
		
	}

	ngOnInit() {
		// this.navigationSubscription = this.router.events.subscribe((e: any) => {
		// 	if (e instanceof NavigationEnd) {
			  this.getDifference()
		// 	}
		//   });
	}

	getDifference(){
		this.dataService.getNotification().subscribe(res => {
			this.notifications = res.filter(c =>c.payload.doc.get('category')==='cours').length
			console.log('Nombre de notification dans la base de données', this.notifications);
			this.storage.get('cours').then(res => {
				this.storageNumber = res || 0
				console.log('Nombre de notification dans le localStorage', this.storageNumber);
				this.difference = this.notifications - this.storageNumber
				console.log('Différence entre les deux ', this.difference);
			})
		})
	}
}
