import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingRoomComponent } from './components/meeting-room.component';

const routes: Routes = [
  {
    component: MeetingRoomComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class MeetingRoomRoutingModule {
}
