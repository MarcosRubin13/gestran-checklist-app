import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.toastr.error('Todos os campos são obrigatórios', 'Erro');
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.toastr.success('Login realizado com sucesso', 'Sucesso');
        this.router.navigate(['/checklists']);
      },
      error => {
        this.toastr.error('Usuário ou senha inválidos', 'Erro');
      }
    );
  }
}

