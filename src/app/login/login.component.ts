import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  constructor(private apiService: ApiRestService) { }
  userData: any = {};
  message = ''; // Variable para controlar la visibilidad del mensaje de éxito
  messageErr = '';
  visabilityMsgSuc = false;
  visabilityMsgErr = false;
  
  login() {
    if (this.loginForm.valid) {
      this.userData.email = this.loginForm.get('email')?.value;
      this.userData.password = this.loginForm.get('password')?.value;
      this.apiService.UserLogin(this.userData).subscribe((response) => {
        if (response.statusCode == 400) {
          this.messageErr = response.message;
          this.visabilityMsgSuc = false;
          this.visabilityMsgErr = true;
        } else if (response.statusCode == 200) {
          this.message = response.message;
          this.visabilityMsgSuc = true;
          this.visabilityMsgErr = false;
        }
      });
    }
  }
}
