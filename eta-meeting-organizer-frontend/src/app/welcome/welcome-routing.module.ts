import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeDescriptionComponent } from '~/app/welcome/components/welcome-description.component';

const routes: Routes = [
  {
    component: WelcomeDescriptionComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class WelcomeRoutingModule {
}
