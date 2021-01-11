import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css']
})
export class RegistoComponent implements OnInit {


  user: IUserRegisto = new UserRegisto();
  confirmarPassword = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();

  }



  registoStore() : void {
    if (this.registoForm.controls['email'].value != null && this.registoForm.controls['password'].value != null) {
      firebase.auth().createUserWithEmailAndPassword(this.registoForm.controls['email'].value, this.registoForm.controls['password'].value)
        .then((user) => {

        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

        });
    }
  }

  onSubmit():void{

  }

  registo():void{

  }

}
