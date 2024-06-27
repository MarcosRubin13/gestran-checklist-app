import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { VerifyChecklistComponent } from './verify-checklist/verify-checklist.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'checklist', component: ChecklistComponent },
  { path: 'verify-checklist', component: VerifyChecklistComponent },
  { path: '**', redirectTo: '/auth' }
];
