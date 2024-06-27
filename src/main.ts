import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthComponent } from './app/auth/auth.component';
import { ChecklistComponent } from './app/checklist/checklist.component';
import { VerifyChecklistComponent } from './app/verify-checklist/verify-checklist.component';
import { AuthService } from './app/services/auth.service';
import { ChecklistService } from './app/services/checklist.service';
import { AuthInterceptor } from './app/auth.interceptor';
import { APP_ROUTES } from './app/app-routing.module'; 

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      RouterModule.forRoot(APP_ROUTES)
    ),
    AuthService,
    ChecklistService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
}).catch(err => console.error(err));
