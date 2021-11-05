import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavPage } from './sidenav.page';

const routes: Routes = [
  {
    path: 'nav',
    component: SidenavPage,
    children: [
      {
        path: 'about',
        loadChildren: () => import('../pages/about/about.module').then(m => m.AboutPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../pages/notification/notification.module').then(m => m.NotificationPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../pages/contact/contact.module').then(m => m.ContactPageModule)
      },
      {
        path: 'cours',
        loadChildren: () => import('../pages/cours/cours.module').then( m => m.CoursPageModule)
      },
      {
        path: 'event',
        loadChildren: () => import('../pages/event/event.module').then( m => m.EventPageModule)
      },

      {
        path: '',
        redirectTo: '/nav/notification',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/nav/notification',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidenavPageRoutingModule {}
