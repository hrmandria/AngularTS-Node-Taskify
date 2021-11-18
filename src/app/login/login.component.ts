import { Router } from '@angular/router';
import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public subscribeForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private user: UserService, private router: Router) {}

  ngOnInit(): void {}

  public async login(): Promise<void> {
    try {
      const res = await this.user
        .login({
          username: this.loginForm.controls.email.value,
          password: this.loginForm.controls.password.value,
        })
        .toPromise();
      sessionStorage.setItem('X-TOKEN', res.token);
      location.reload();
    } catch (e) {
      alert("Veuillez vérifier votre nom et votre mot de passe.");
    }
  }

  public async subscribe(): Promise<void> {
    try {
      console.log('Done');
      const res = await this.user
        .create({
          username: this.subscribeForm.controls.email.value,
          password: this.subscribeForm.controls.password.value,
        })
        .toPromise();
      alert('Inscription Effectué');
      location.reload();
    } catch (e) {
      alert('Utilisateur déja existant.');
    }
  }
}
