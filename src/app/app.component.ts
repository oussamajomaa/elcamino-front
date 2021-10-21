import { Component, OnInit } from '@angular/core';
import {
	ActionPerformed,
	PushNotificationSchema,
	PushNotifications,
	Token,
	
} from '@capacitor/push-notifications';
import { FCM } from "@capacitor-community/fcm";

import { Capacitor } from '@capacitor/core';
import { DataService } from 'src/app/services/data.service';
const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

	body: string = ""
	listData:any = []
	notif:any
	tokens=[]
	constructor(
		private dataService: DataService,
		) {
		// this.loadData()
	}


	// async loadData(){
	// 	// this.listData = await this.dataService.getData()
	// 	this.dataService.getData().subscribe(res => this.listData = res)
	// }


	ngOnInit() {
		if (isPushNotificationsAvailable) {
			console.log('Initializing HomePage');

			// PushNotifications.register()
			// .then(() => {
			// 	return FCM.subscribeTo({ topic: 'all' });
			// })

			PushNotifications.requestPermissions().then(result => {
				if (result.receive === 'granted') {
					// Register with Apple / Google to receive push via APNS/FCM
					PushNotifications.register();
				} else {
					// Show some error
				}
			});

			PushNotifications.addListener('registration', (token: Token) => {
				return FCM.subscribeTo({ topic: 'all' });
			});

			PushNotifications.addListener('registrationError', (error: any) => {
				alert('Error on registration: ' + JSON.stringify(error));
			});

			PushNotifications.addListener(
				'pushNotificationReceived',
				(notification: PushNotificationSchema) => {
					alert('notification reçue ' + JSON.stringify(notification.body));
					// this.notif = {
					// 	date:new Date().toISOString().slice(0, 10)+' '+new Date().toISOString().slice(11, 19),
					// 	title: notification.title,
					// 	body: notification.body,
					// 	title1:notification.title,
					// 	body1: notification.body,
					// }
					// this.dataService.addData(this.notif)
					// this.loadData()
				},
			);

			PushNotifications.addListener(
				'pushNotificationActionPerformed',
				async (notification:ActionPerformed) => {
					// const item = {
					// 	date:new Date().toISOString().slice(0, 10)+' '+new Date().toISOString().slice(11, 19),
					// 	title: notification.notification.title,
					// 	body: notification.notification.body,
					// 	title1: notification.notification.data.title,
					// 	body1: notification.notification.data.body,
					// }
					// await this.dataService.addData(item)
					// await this.loadData()
					// alert('Push action performed: ' + JSON.stringify(notification));
					
				},
			);
		}
	}
}
