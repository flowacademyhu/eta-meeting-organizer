import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '~/app/shared/shared.module';
import { BuildingRoutingModule } from './building-routing.module';
import { BuildingComponent } from './components/building.component';

@NgModule({
  declarations: [
    BuildingComponent,
  ],
  imports: [
    SharedModule,
    BuildingRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class BuildingModule { }
