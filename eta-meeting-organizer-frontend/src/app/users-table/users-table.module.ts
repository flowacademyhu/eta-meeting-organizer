import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { UsersTableComponent } from './components/users-table.component';
import { UsersTableRoutingModule } from './users-table-routing.module';

@NgModule({
  declarations: [
    UsersTableComponent,
  ],
  imports: [
    SharedModule,
    UsersTableRoutingModule,
    TranslateModule.forChild(),
  ],
})
export class UsersTableModule { }
