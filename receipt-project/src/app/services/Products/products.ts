import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from "../../Interfaces/productInterface";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    constructor(private http: HttpClient) { }

    getFilteredResult(input:string){
        let i = 0;
        this.getProducts().subscribe(products => {
            return products.filter(product => 
                product.prodDescription.toLowerCase().includes(input)
                &&
                i++ < 10
            );
        });
    }

    getProducts(): Observable<Product[]>{
          
        return this.http.get<Product[]>("https://localhost:7006/products/");
    }
}