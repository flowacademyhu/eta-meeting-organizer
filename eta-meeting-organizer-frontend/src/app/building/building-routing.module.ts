import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingComponent } from './components/building.component';

const routes: Routes = [
  {
    component: BuildingComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class BuildingRoutingModule {
}
