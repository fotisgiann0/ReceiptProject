import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


import { receiptLine } from '../../Interfaces/receiptLineInterface';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/Products/products';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search-catalog',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule],
  templateUrl: './search-catalog.component.html',
  styleUrl: './search-catalog.component.css'
})
export class SearchCatalogComponent implements OnInit {
  constructor(private productService: ProductsService){
    
  }

  searchForm = new FormGroup({
    description: new FormControl('')
  })

  @Output() productsChange = new EventEmitter<receiptLine[]>();

  @Output() itemSelected = new EventEmitter<receiptLine>();

  searchInput: string | number = ''; //input for handle search

  productID = 0
  products:receiptLine[] = [];
  searchList: receiptLine[] = []; 

  ngOnInit(){
    let i = 0;

    this.productService.getProducts()
    .pipe(
      map(products => products.filter(p => i++ < 10))
    )
    .subscribe(productsArray => {
      productsArray.forEach(product =>{
        const newLineProduct: receiptLine = {
          user_id: 0,
          quantity: 0,
          total: 0,
          product_id: product.productId,
          description: product.prodDescription,
          price: product.price,
          stock: product.inventory
        };

        this.products.push(newLineProduct);
      })
    })

    console.log(this.products);
  }


  formSubmit(){
    const description = this.searchForm.value.description;

    console.log("Description: "+ description);

    const selected_object = this.products.find(item => item.description === description);
    
    console.log("selected_object: "+selected_object);
    console.log(selected_object)
    
    if(selected_object){
      this.itemSelected.emit(selected_object);
      this.productsChange.emit(this.products);
    }else{
      console.log("error:" +typeof(selected_object));
    }
  }

  searchProducts(input: string | number): receiptLine[]{
    let returnObject:receiptLine[] = [];
    if(typeof(input) === 'number'){
      const index = this.products.findIndex(item => item.product_id === Number(input));

      returnObject.push(this.products[index]);

      console.log(returnObject);

      return returnObject;
    }else{
      this.products.forEach(element => {
        if(element.description.toLowerCase().includes(input)){
          returnObject.push(element);
        }
      });

      console.log(returnObject);
     
      this.searchList = returnObject;
      return returnObject;
    }
  }
}
