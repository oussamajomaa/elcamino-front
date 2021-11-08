import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
// import { Plugins } from '@capacitor/core';
// const { App } = Plugins;
import { App } from '@capacitor/app';

import { Storage } from '@ionic/storage-angular'
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';






@Component({
	selector: 'app-notification',
	templateUrl: './notification.page.html',
	styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

	cours = 0
	storageCours = 0
	differenceCours = 0
	event = 0
	storageEvent = 0
	differenceEvent = 0

	stage = 0
	storageStage = 0
	differenceStage = 0


	constructor(
		private platform: Platform,
		private routerOutlet: IonRouterOutlet,
		private storage: Storage,
		private router: Router,
		private dataService: DataService,
		private route: ActivatedRoute
	) {
		this.platform.backButton.subscribeWithPriority(-1, () => {
			if (!this.routerOutlet.canGoBack()) {
				App.exitApp();
			}
		});
		
	}

	ngOnInit() {
		
	}

	ionViewWillEnter() {
		this.getDifference()
	  }

	getDifference() {
		this.dataService.getCours().subscribe(res => {
			this.cours = res.length
			this.storage.get('cours').then(res => {
				this.storageCours = res || 0
				this.differenceCours = this.cours - this.storageCours
			})
		})

		this.dataService.getEvents().subscribe(res => {
			this.event = res.length
			this.storage.get('event').then(res => {
				this.storageEvent = res || 0
				this.differenceEvent = this.event - this.storageEvent
			})
		})

		this.dataService.getStages().subscribe(res => {
			this.stage = res.length
			this.storage.get('stage').then(res => {
				this.storageStage = res || 0
				this.differenceStage = this.stage - this.storageStage
			})
		})
	}

}
