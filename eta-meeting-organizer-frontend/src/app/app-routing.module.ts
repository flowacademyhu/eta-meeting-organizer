import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '~/app/shared/pages/main-layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    component: MainLayoutComponent,
    loadChildren: () => import('./login/login.module')
      .then((m) => m.LoginModule),
    path: 'login',
  },
  {
    component: MainLayoutComponent,
    loadChildren: () => import('./auth/auth.module')
      .then((m) => m.AuthModule),
    path: 'auth',
  },
  { component: MainLayoutComponent,
    loadChildren: () => import('./welcome/welcome.module')
      .then((m) => m.WelcomeModule),
    path: 'welcome',
    pathMatch: 'full',
  },
  {
    component: MainLayoutComponent,
    loadChildren: () => import('./building/building.module')
      .then((m) => m.BuildingModule),
    path: 'building-register'
  },
  {
    component: MainLayoutComponent,
    loadChildren: () => import('./profile/profile.module')
      .then((p) => p.ProfileModule),
      path: 'profile',
      pathMatch: 'full',
  },
  {
    component: MainLayoutComponent,
    loadChildren: () => import('./meeting-room/meeting-room.module')
      .then((m) => m.MeetingRoomModule),
    path: 'meetingroom',
    pathMatch: 'full',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
