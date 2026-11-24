import type { Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'events',
        loadComponent: () => import('./pages/events/events.page').then((m) => m.EventsPage),
      },
      {
        path: 'interpreters',
        loadComponent: () => import('./pages/interpreters/interpreters.page').then((m) => m.InterpretersPage),
      },
      {
        path: 'videos',
        loadComponent: () => import('./pages/videos/videos.page').then((m) => m.VideosPage),
      },
      {
        path: 'staff',
        loadComponent: () => import('./pages/staff/staff.page').then((m) => m.StaffPage),
      },
      {
        path: 'event-form',
        loadComponent: () => import('./pages/event-form/event-form.page').then((m) => m.EventFormPage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
