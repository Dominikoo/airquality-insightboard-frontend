import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  loading = false;
  error?: string;

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = undefined;

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/air-quality']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Niepoprawny email lub hasło.';
      },
    });
  }
}
