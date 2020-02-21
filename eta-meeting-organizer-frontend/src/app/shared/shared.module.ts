import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from '~/app/shared/components/footer-layout.component';
import {AuthGuard} from '~/app/shared/guard/auth.guard';
import {RequestInterceptorService} from '~/app/shared/interceptor/auth-interceptor.service';
import { MaterialModule } from '~/app/shared/material.module';
import { MainLayoutComponent } from '~/app/shared/pages/main-layout.component';
import { ApiCommunicationService } from '~/app/shared/services/api-communication.service';
import { ConfigurationService } from '~/app/shared/services/configuration.service';
import { HeaderComponent } from './components/header-layout.component';
import { BuildingRegisterComponent } from './Modals/building-register.component';
import { MeetingRoomDeleteComponent } from './Modals/meeting-room-delete.component';
import { MeetingRoomRegisterComponent } from './Modals/meeting-room-register.component';
import { UserDeleteDialogComponent } from './Modals/user-delete-dialog';
import { UserVerificationDialogComponent } from './Modals/user-verification-dialog';
import { MeetingRoomService } from './services/meeting-room.service';
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
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forChild(),
    RouterModule,
  ],
  providers: [
    ApiCommunicationService,
    ConfigurationService,
    MeetingRoomService,
    UserService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true},
  ],
})
export class SharedModule { }
