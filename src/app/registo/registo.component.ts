import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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
      firstName: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmarPassword: new FormControl('', [Validators.required]),


    });
  }

  onSubmit():void{

  }

  registo():void{
    console.log(this.registoForm.controls['firstName'].value)
    console.log(this.registoForm.controls['lastName'].value)
    console.log(this.registoForm.controls['email'].value)
    console.log(this.registoForm.controls['password'].value)
    console.log(this.registoForm.controls['confirmarPassword'].value)
  }

}
