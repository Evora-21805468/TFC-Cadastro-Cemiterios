import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import firebase from 'firebase';


@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css']
})
export class RegistoComponent implements OnInit {

  // @ts-ignore
  registoForm: FormGroup;
  // @ts-ignore
  isSaving: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();

  }

  private createForm() {
    this.registoForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmarPassword: new FormControl('', [Validators.required]),
    });
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
    console.log(this.registoForm.controls['email'].value)
    console.log(this.registoForm.controls['password'].value)
    console.log(this.registoForm.controls['confirmarPassword'].value)
  }

}
