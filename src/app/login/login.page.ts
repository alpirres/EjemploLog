import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthService } from '../services/auth.service';
import { UiComponent } from '../common/ui/ui.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;

  constructor(private auth:AuthService, private ui:UiComponent, private router:Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.auth.logOut();
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };

  public loginUser(value){
    this.auth.loginUser(value)
    .then(res => {
      console.log(res);
      this.router.navigate(['/tabs']);
    }, err => {
      
    })
  }

  public async loginGoogle(){
    this.ui.presentLoading();
    const r:boolean = await this.auth.loginGoogle();
    this.ui.hideLoading();
    if(r){
      this.router.navigate(['/tabs']);
    }
  }

  public goToRegisterPage(){
    this.router.navigate(['/register']);
  }

}
