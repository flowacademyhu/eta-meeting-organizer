import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {AuthRoutingModule} from '~/app/auth/auth-routing.module';
import {AuthComponent} from '~/app/auth/components/auth.component';
import {SharedModule} from '~/app/shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    TranslateModule.forChild(),
  ],
  providers: []
})
export class AuthModule { }
