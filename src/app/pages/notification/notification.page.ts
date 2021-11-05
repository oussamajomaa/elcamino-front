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
			console.log('Nombre de notification dans la base de données', this.cours);
			this.storage.get('cours').then(res => {
				this.storageCours = res || 0
				console.log('Nombre de Cours dans le storageCours', this.storageCours);
				this.differenceCours = this.cours - this.storageCours
				console.log('Différence entre les deux ', this.differenceCours);
			})
		})

		this.dataService.getEvents().subscribe(res => {
			this.event = res.length
			console.log('Nombre de notification dans la base de données', this.event);
			this.storage.get('event').then(res => {
				this.storageEvent = res || 0
				console.log('Nombre de Events dans le storageEvent', this.storageEvent);
				this.differenceEvent = this.event - this.storageEvent
				console.log('Différence entre les deux ', this.differenceEvent);
			})
		})

		this.dataService.getStages().subscribe(res => {
			this.stage = res.length
			console.log('Nombre de Stages dans la base de données', this.stage);
			this.storage.get('stage').then(res => {
				this.storageStage = res || 0
				console.log('Nombre de notification dans le storageStage', this.storageStage);
				this.differenceStage = this.stage - this.storageStage
				console.log('Différence entre les deux ', this.differenceStage);
			})
		})
	}

}
