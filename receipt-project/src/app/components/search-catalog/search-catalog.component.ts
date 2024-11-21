import { Component, EventEmitter, Output } from '@angular/core';

import data from '../../data/catalogue.json';
import { registerObject } from '../../cashRegisterObject';
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


  @Output() itemSelected = new EventEmitter<registerObject>();

  searchInput: string | number = '';

  catalogue: registerObject[] = data;
  searchList: registerObject[] = [];

  handleFormSubmit(){
    const description = this.searchForm.value.description
    const selected_object = this.catalogue.find(item => item.description === description);
    if(selected_object){
      this.itemSelected.emit(selected_object);
    }else{
      console.log("error:" +typeof(selected_object));
    }
  }

  handleSearch(input: string | number): registerObject[]{
    let returnObject:registerObject[] = [];
    if(typeof(input) === 'number'){
      const index = this.catalogue.findIndex(item => item.product_id === Number(input));

      returnObject.push(this.catalogue[index]);

      console.log(returnObject);

      return returnObject;
    }else{
      this.catalogue.forEach(element => {
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
