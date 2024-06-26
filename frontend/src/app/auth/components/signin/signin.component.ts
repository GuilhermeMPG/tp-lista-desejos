import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.component.scss'],
})

export class SigninComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  showPassword = false;

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.authService.singin(this.loginForm.value).subscribe((response) => {
      console.log(response);
      this.authService.setToken(response.access_token);
      console.log(localStorage.getItem);
      this.router.navigate(['/home']);
    });
  }

  togglePasswordVisibility(data:string) {
    if(data=='senha'){this.showPassword = !this.showPassword;}

  }
}
