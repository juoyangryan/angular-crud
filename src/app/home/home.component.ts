import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProducts().subscribe((response) => {
      this.products = response;
    })
  }

  handleDelete(id: number) {
    this.authService.deleteProduct(id).subscribe((response) => {
      console.log("Deleted: " + response);
    })
  }

  handleAdd(productName: string, productDescription: string) {
    this.authService.addProduct(productName, productDescription).subscribe((response) => {
      console.log("Added: " + response)
    })
  }
  
}
