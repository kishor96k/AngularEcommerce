import { Component, OnInit } from '@angular/core';
import { EcommerceService } from './Service/ecommerce.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cartProducts: any;
  loggedUser: any;

  registerObj: any = {
    "CustId": 0,
    "Name": "",
    "MobileNo": "",
    "Password": ""
  }

  loginObj: any = {
    "UserName": "",
    "UserPassword": ""
  }

  ngOnInit(): void {
  }

  constructor(
    private Service: EcommerceService
  ) {
    const LocalData = localStorage.getItem('UserCustomer');
    if (LocalData != null) {
      const parseObj = JSON.parse(LocalData);
      this.loggedUser = parseObj;
      this.GetCartProductsByCustomerId(this.loggedUser.custId);

      this.Service.cartUpdates.subscribe((res: any) => {
        if (res) {
          this.GetCartProductsByCustomerId(this.loggedUser.custId);
        }
      })
    }

  }

  DeleteProductFromCartById(id:any){
    this.Service.DeleteProductFromCartById(id).subscribe((response:any)=>{
      console.log(response.data,"cart removed");
      this.GetCartProductsByCustomerId(this.loggedUser.custId);      
      if(response.result){
        alert("Success CartaItemRemoved");
      }else{
        alert("Error CartaItemRemoved")
      }
    })
  }

  GetCartProductsByCustomerId(id: any) {
    this.Service.GetCartProductsByCustomerId(id).subscribe((response: any) => {
      console.log(response.data, "GetCartProductsByCustomerId");
      this.cartProducts = response.data
    })
  }


  onRegisterClose() {
    const registerModal = document.getElementById('registerModal');
    if (registerModal != null) {
      registerModal.style.display = 'none';
    }
  }

  registerCustomer() {
    this.Service.registerCustomer(this.registerObj).subscribe((response: any) => {
      console.log(response, "response of register");
      this.loggedUser = response.data;
      if (response.result) {
        alert("Success Register");
        this.onRegisterClose();
      } else {
        alert("Error Register");
      }
    })
  }

  loginCustomer() {
    this.Service.loginCustomer(this.loginObj).subscribe((response: any) => {
      console.log(response.data, "response of data");
      this.loggedUser = response.data;
      localStorage.setItem('UserCustomer', JSON.stringify(response.data));
      this.GetCartProductsByCustomerId(this.loggedUser.custId);
      if (response.result) {
        alert("Success Login")
      } else {
        alert("Error Login");
      }
    })
  }

}
