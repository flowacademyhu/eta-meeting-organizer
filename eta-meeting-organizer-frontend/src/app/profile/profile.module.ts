import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './../shared/shared.module';
import { ProfileComponent } from './components/profile.components';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  exports: [],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    TranslateModule.forChild(),
  ],
  providers: [],
})
export class ProfileModule { }
