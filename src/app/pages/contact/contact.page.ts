import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
// import { Plugins } from '@capacitor/core';
// const { App } = Plugins;
import { App } from '@capacitor/app';


@Component({
	selector: 'app-contact',
	templateUrl: './contact.page.html',
	styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
	

	

	constructor(private platform: Platform,
		private routerOutlet: IonRouterOutlet) {
		this.platform.backButton.subscribeWithPriority(-1, () => {
			if (!this.routerOutlet.canGoBack()) {
				App.exitApp();
			}
		});
	}

	ngOnInit(){
	}

	

}
