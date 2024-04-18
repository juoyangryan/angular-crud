import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class authGuard implements CanActivate {
  canActivate() {
    return localStorage.getItem("access_token") ? true : false;
  }
};
