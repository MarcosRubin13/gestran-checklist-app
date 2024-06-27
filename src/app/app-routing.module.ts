import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { VerifyChecklistComponent } from './verify-checklist/verify-checklist.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'checklists', component: ChecklistComponent },
  { path: 'checklists/:id/verify', component: VerifyChecklistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
