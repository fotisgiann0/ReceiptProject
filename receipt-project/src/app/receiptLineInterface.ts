export interface receiptLine {
    user_id: number;
    product_id: number;
    description: string;
    price: number;
    quantity: number;
    total: number;
    stock: number;
}