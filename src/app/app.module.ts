import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AppComponent } from './app.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { VerifyChecklistComponent } from './verify-checklist/verify-checklist.component';
import { AuthService } from './services/auth.service';
import { ChecklistService } from './services/checklist.service';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AuthComponent,
    ChecklistComponent,
    VerifyChecklistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    ChecklistService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: []
})
export class AppModule { }
