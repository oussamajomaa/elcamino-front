import { Component, OnInit } from '@angular/core';

import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.page.html',
  styleUrls: ['./sidenav.page.scss'],
})

export class SidenavPage implements OnInit {

  active = '';

  NAV = [
    // {
    //   name: 'Accueil',
    //   link: '/nav/accueil',
    //   icon: 'home'
    // },
    {
      name: 'Notification',
      link: '/nav/notification',
      icon: 'notifications'
    },
    {
      name: 'À propos',
      link: '/nav/about',
      icon: 'information-circle'
    },
    {
      name: 'Contacts & localision',
      link: '/nav/contact',
      icon: 'location'
    }
  ]

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.active = event.url
    })
  }

  ngOnInit() { }

}
