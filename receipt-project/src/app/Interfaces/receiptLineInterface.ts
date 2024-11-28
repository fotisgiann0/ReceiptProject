import { Product } from "./productInterface";

export interface receiptLine {
    user_id: number;
    quantity: number; 
    total: number;
    
    product_id: number;
    description: string; //prodDescription
    price: number; //price
    stock: number; //inventory
    // fpaCategory: number,
}

//     productId: number,
//     prodDescription: string,
//     price: number,
//     fpaCategory: number,
//     inventory: number,
//     isDeleted: boolean