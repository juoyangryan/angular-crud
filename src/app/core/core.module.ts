import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ], 
  providers: [AuthService]
})
export class CoreModule { }
