import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '~/app/shared/pages/main-layout.component';

const routes: Routes = [
  {
    component: MainLayoutComponent,
    loadChildren: () => import('./welcome/welcome.module')
      .then((m) => m.WelcomeModule),
    path: 'welcome',
    pathMatch: 'full',
  },
  {
    component: MainLayoutComponent,
    loadChildren: () => import('./login/login.module')
      .then((m) => m.LoginModule),
    path: '',
    pathMatch: 'full',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
