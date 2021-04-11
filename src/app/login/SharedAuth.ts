import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class SharedAuth {
  private admin:boolean = false;

  setGlobalVar(c:boolean) {
    this.admin = c;
  }

  getGlobalVar():boolean{
    return this.admin;
  }
}
