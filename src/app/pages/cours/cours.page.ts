import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
// import { Plugins } from '@capacitor/core';
// const { App } = Plugins;
import { App } from '@capacitor/app';
import { Storage } from '@ionic/storage-angular'
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';


@Component({
	selector: 'app-cours',
	templateUrl: './cours.page.html',
	styleUrls: ['./cours.page.scss'],
})
export class CoursPage implements OnInit {
	notifications = []

	constructor(
		private platform: Platform,
		private routerOutlet: IonRouterOutlet,
		private dataService: DataService,
		private storage: Storage,
		private router:Router
	) {
		this.platform.backButton.subscribeWithPriority(-1, () => {
			if (!this.routerOutlet.canGoBack()) {
				App.exitApp();
			}
		});
	}

	ngOnInit() {
		this.getNotification()

	}

	// https://www.youtube.com/watch?v=HeAD6DaKbns
	getNotification() {

		this.notifications = []
		this.dataService.getCours().subscribe(res => {
			console.log(res.length);
			// mettre à jour le localStorage
			this.storage.set('cours', res.length)

			let notifications = res.map(item => {
				return {
					title: item.payload.doc.get('title'),
					body: item.payload.doc.get('body'),
					category: item.payload.doc.get('category'),
					// date: new Date(item.payload.doc.get('date')).toLocaleString()
					date:item.payload.doc.get('date')
				}
			})
			this.notifications = notifications
			this.notifications = notifications.sort((a, b) => {
				if (a.date < b.date) return 1;
				if (a.date > b.date) return -1;
				return 0;
			})

			this.notifications = this.notifications.map(item => {
				item.date = new Date(item.date).toLocaleString().slice(0,17)
				return item
			})
		})
		
	}
}
