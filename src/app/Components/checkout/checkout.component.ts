import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/Service/ecommerce.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartProducts: any;
  loggedUser: any;

  ngOnInit(): void {

  }

  checkOutObj: any = {
    "SaleId": 0,
    "CustId": 0,
    "SaleDate": new Date(),
    "TotalInvoiceAmount": 0,
    "Discount": 0,
    "PaymentNaration": "",
    "DeliveryAddress1": "",
    "DeliveryAddress2": "",
    "DeliveryCity": "",
    "DeliveryPinCode": "",
    "DeliveryLandMark": ""
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

  GetCartProductsByCustomerId(id: any) {
    this.Service.GetCartProductsByCustomerId(id).subscribe((response: any) => {
      console.log(response.data, "GetCartProductsByCustomerId");
      this.cartProducts = response.data
    })
  }

  PlaceOrder() {
    this.checkOutObj.custId = this.loggedUser.custId;
    this.Service.PlaceOrder(this.checkOutObj).subscribe((response: any) => {
      console.log(response.data, "place order details");
      this.Service.cartUpdates.next(true);
      if (response.result) {
        alert("Success Placeorder");
      } else {
        alert("Error Placeorder")
      }

    })
  }

}
