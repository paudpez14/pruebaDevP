import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  userData: any = {}; // Datos del usuario a registrar
  constructor(private apiService: ApiRestService) { }
  loading = false;
  error = false;
  message = ''; // Variable para controlar la visibilidad del mensaje de éxito
  messageErr = '';
  visabilityMsgSuc = false;
  visabilityMsgErr = false;
  saveRegistration() {
    if (this.registrationForm.valid) {
      // Implementa la lógica para guardar los datos en la base de datos aquí
      this.userData.name = this.registrationForm.get('firstName')?.value;
      this.userData.lastname = this.registrationForm.get('lastName')?.value;
      this.userData.email = this.registrationForm.get('email')?.value;
      this.userData.password = this.registrationForm.get('password')?.value;
      this.userRegister();
    }
  }

  



  userRegister() {
    this.apiService.UserRegister(this.userData).subscribe(
      (response) => {
        if(response.statusCode == 400){
          this.messageErr = response.message;
          this.visabilityMsgSuc = false;
          this.visabilityMsgErr = true;
        }else if(response.statusCode ==200){
          this.message = response.message;
          this.visabilityMsgSuc = true;
          this.visabilityMsgErr = false;
        }
      }
    );
  }
}
