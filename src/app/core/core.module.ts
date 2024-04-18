import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { authGuard } from './auth.guard';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ], 
  providers: [AuthService, authGuard]
})
export class CoreModule { }
