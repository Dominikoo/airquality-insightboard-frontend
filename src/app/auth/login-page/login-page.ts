import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  loading = false;
  errorKey?: string;
  currentLang = 'en';

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
    private router: Router,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {
    this.currentLang = this.translate.currentLang || 'en';
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorKey = undefined;

    this.auth.login(this.form.getRawValue())
      .subscribe({
        next: () => {
          this.router.navigate(['/air-quality']);
        },
        error: (err) => {
          console.error('LOGIN FAILED:', err);
          this.errorKey = 'auth.login.error.invalidCredentials';
        }
      })
      .add(() => {
        this.loading = false;
        this.cdr.detectChanges();
      });
  }


  switchLang(lang: 'en' | 'pl') {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
