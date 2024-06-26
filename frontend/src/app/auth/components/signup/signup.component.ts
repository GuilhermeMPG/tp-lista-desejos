import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss'],
})
export class SignupComponent implements OnInit {
  showPassword = false;
  showPasswordConfirme=false;
  constructor() {}

  ngOnInit(): void {}

  creatLoginForm = new FormGroup(
    {
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      passwordConfirme: new FormControl('', [Validators.required]),
    },
    {
      validators: this.passwordMatchValidator.bind(this),
    }
  );

  private passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('passwordConfirme')?.value;

    if (password !== confirmPassword) {
      control.get('passwordConfirme')?.setErrors({ mismatch: true });
    } else {
      control.get('passwordConfirme')?.setErrors(null);
    }

    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility(data:string) {
    if(data=='password'){this.showPassword = !this.showPassword;}
    if(data=='passwordConfirme'){this.showPasswordConfirme=!this.showPasswordConfirme}

  }
  onSubmit() {
    console.log(this.creatLoginForm.value);
  }
}
