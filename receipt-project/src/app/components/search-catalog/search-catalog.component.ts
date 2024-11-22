import { Component, EventEmitter, Input, Output } from '@angular/core';


import { receiptLine } from '../../receiptLineInterface';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-catalog',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule],
  templateUrl: './search-catalog.component.html',
  styleUrl: './search-catalog.component.css'
})
export class SearchCatalogComponent {
  searchForm = new FormGroup({
    description: new FormControl('')
  })

  @Output() itemSelected = new EventEmitter<receiptLine>();

  searchInput: string | number = ''; //input for handle search

  @Input({
    required: true,
  }) products:receiptLine[] = [];
  
  searchList: receiptLine[] = []; 

  formSubmit(){
    const description = this.searchForm.value.description
    const selected_object = this.products.find(item => item.description === description);
    if(selected_object){
      this.itemSelected.emit(selected_object);
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
