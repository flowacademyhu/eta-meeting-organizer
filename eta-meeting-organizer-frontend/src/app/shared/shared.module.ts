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
import { AuthService } from '~/app/shared/services/auth.service';
import { ConfigurationService } from '~/app/shared/services/configuration.service';
import { HeaderComponent } from './components/header-layout.component';
<<<<<<< HEAD
=======
import { AuthService } from './services/auth.service';
import { BuildingRegisterComponent } from './Modals/building-register.component';
import { MeetingRoomRegisterComponent } from './Modals/meeting-room-register.component';
>>>>>>> 52f8e00befb90345d068957d80c00d86e275fcb6

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    MeetingRoomRegisterComponent,
    BuildingRegisterComponent,
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
    AuthGuard,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true},
  ],
})
export class SharedModule { }
