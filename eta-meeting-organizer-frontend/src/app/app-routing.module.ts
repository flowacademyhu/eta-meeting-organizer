import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '~/app/shared/pages/main-layout.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    loadChildren: () => import('./calendar/calendar.module')
      .then((m) => m.CalendarModule),
    path: 'calendar',
    pathMatch: 'full',
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
  {
    canActivate: [AuthGuard, AdminGuard],
    component: MainLayoutComponent,
    loadChildren: () => import('./building/building.module')
      .then((m) => m.BuildingModule),
    path: 'building-register'
  },
  {
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    loadChildren: () => import('./profile/profile.module')
      .then((p) => p.ProfileModule),
      path: 'profile',
      pathMatch: 'full',
  },
  {
    canActivate: [AuthGuard, AdminGuard],
    component: MainLayoutComponent,
    loadChildren: () => import('./meeting-room/meeting-room.module')
      .then((m) => m.MeetingRoomModule),
    path: 'meetingroom',
    pathMatch: 'full',
  },
  {
    canActivate: [AuthGuard, AdminGuard],
    component: MainLayoutComponent,
    loadChildren: () => import('./users-table/users-table.module')
      .then((m) => m.UsersTableModule),
    path: 'users-table',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/calendar',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
