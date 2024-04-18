import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products: any;
  addForm: FormGroup;
  updateForm: FormGroup;

  constructor(private fb:FormBuilder, private authService: AuthService, private router: Router) {
    this.addForm = this.fb.group({
      productName: ['',Validators.required],
      productDescription: ['',Validators.required]
    });
    this.updateForm = this.fb.group({
      Id: ['',Validators.required],
      productName: ['',Validators.required], 
      productDescription: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.handleGet();
  }

  handleGet() {
    this.authService.getProducts().subscribe((response) => {
      this.products = response;
    })
  }

  handleDelete(id: number) {
    this.authService.deleteProduct(id).subscribe((response) => {
      this.handleGet();
      console.log("Deleted: " + response);
    })
  }

  handleAdd() {
    const val = this.addForm.value;

    this.authService.addProduct(val.productName, val.productDescription).subscribe((response) => {
      this.handleGet();
      console.log("Added: " + response.toString())
    })
  }

  handleUpdate() {
    const val = this.updateForm.value;

    this.authService.updateProduct(val.Id, val.productName, val.productDescription).subscribe((response) => {
      this.handleGet();
      console.log("Updated: " + response.toString())
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("login")
  }
  
}
