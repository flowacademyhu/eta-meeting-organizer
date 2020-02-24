import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '~/app/shared/shared.module';
import { MeetingRoomComponent } from './components/meeting-room.component';
import { MeetingRoomRoutingModule } from './meeting-room-routing.module';

@NgModule({
  declarations: [
    MeetingRoomComponent,
  ],
  imports: [
    MatPaginatorModule,
    SharedModule,
    MeetingRoomRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class MeetingRoomModule { }
