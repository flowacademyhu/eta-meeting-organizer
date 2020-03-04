import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule, DatePipe } from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from '~/app/shared/components/footer-layout.component';
import {AdminGuard} from '~/app/shared/guards/admin.guard';
import {AuthGuard} from '~/app/shared/guards/auth.guard';
import {RequestInterceptorService} from '~/app/shared/interceptor/auth-interceptor.service';
import { MaterialModule } from '~/app/shared/material.module';
import { MainLayoutComponent } from '~/app/shared/pages/main-layout.component';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { ConfigurationService } from '~/app/shared/services/configuration.service';
import { HeaderComponent } from './components/header-layout.component';
import { BuildingCheckboxComponent } from './Modals/building-checkbox-delete.component';
import { BuildingDeleteDialogComponent } from './Modals/building-delete-dialog';
import { BuildingRegisterComponent } from './Modals/building-register.component';
import { BuildingUpdateDialogComponent } from './Modals/building-update-dialog';
import { MeetingRoomCheckboxComponent } from './Modals/meeting-room-checkbox-delete.component';
import { MeetingRoomDeleteComponent } from './Modals/meeting-room-delete.component';
import { MeetingRoomRegisterComponent } from './Modals/meeting-room-register.component';
import { MeetingRoomUpdateComponent } from './Modals/meeting-room-update.component';
import { ReservationBookingComponent } from './Modals/reservation-book.component';
import { ReservationDeleteComponent } from './Modals/reservation-delete.component';
import { ReservationInfoComponent } from './Modals/reservation-info.component';
import { ReservationTimeUpdateComponent } from './Modals/reservation-time-update';
import { ReservationUpdateComponent } from './Modals/reservation-update.component';
import { UserCheckboxComponent } from './Modals/user-checkbox-delete.component';
import { UserDeleteDialogComponent } from './Modals/user-delete-dialog';
import { UserVerificationDialogComponent } from './Modals/user-verification-dialog';
import { BuildingService } from './services/building.service';
import { MeetingRoomService } from './services/meeting-room.service';
import { ReservationService } from './services/reservation.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    UserDeleteDialogComponent,
    MeetingRoomRegisterComponent,
    BuildingRegisterComponent,
    MeetingRoomDeleteComponent,
    UserVerificationDialogComponent,
    MeetingRoomUpdateComponent,
    BuildingDeleteDialogComponent,
    BuildingUpdateDialogComponent,
    ReservationBookingComponent,
    MeetingRoomCheckboxComponent,
    ReservationUpdateComponent,
    ReservationInfoComponent,
    ReservationDeleteComponent,
    ReservationTimeUpdateComponent,
    BuildingCheckboxComponent,
    UserCheckboxComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MaterialModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forChild(),
    RouterModule,
  ],
  providers: [
    ApiCommunicationService,
    ConfigurationService,
    MeetingRoomService,
    MeetingRoomRegisterComponent,
    UserService,
    DatePipe,
    AuthGuard,
    AdminGuard,
    BuildingService,
    ReservationService,
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true},
  ],
})
export class SharedModule { }
