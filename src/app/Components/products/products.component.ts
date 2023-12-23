import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/Service/ecommerce.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsAll: any;
  categoriesall: any;
  productsByCategories: any;
  selectedCategory: any;
  loggedUser: any;


  ngOnInit(): void {
    this.GetAllProducts();
    this.GetAllCategory();
  }

  constructor(
    private Service: EcommerceService
  ) {
    const LocalData = localStorage.getItem('UserCustomer');
    if (LocalData != null) {
      const parseObj = JSON.parse(LocalData);
      this.loggedUser = parseObj;
    }
  }

  GetAllProducts() {
    this.Service.GetAllProducts().subscribe((response: any) => {
      console.log(response.data, "all products");
      this.productsAll = response.data;
    })
  }

  GetAllCategory() {
    this.Service.GetAllCategory().subscribe((response: any) => {
      console.log(response.data, 'all categories');
      this.categoriesall = response.data.slice(0, 5);
    })
  }

  GetAllProductsByCategoryId(categoryId: any) {
    this.selectedCategory = categoryId;
    this.Service.GetAllProductsByCategoryId(categoryId).subscribe((response: any) => {
      console.log(response.data, "products by category");
      this.productsAll = response.data;
    })
  }

  addToCart(productId: any) {
    const addToCartObj: any = {
      "CartId": 0,
      "CustId": this.loggedUser.custId,
      "ProductId": productId,
      "Quantity": 1,
      "AddedDate": new Date()
    }
    console.log(addToCartObj,'object of add to cart');
    this.Service.AddToCart(addToCartObj).subscribe((response: any) => {
      console.log(response, "response of cart");
      this.Service.cartUpdates.next(true);
      if (response.result) {
        alert("Success addtocart")
      } else {
        alert("Error addtocart");
      }
    })
  }

}





