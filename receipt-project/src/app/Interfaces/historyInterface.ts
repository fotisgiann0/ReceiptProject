import { receiptLine } from "./receiptLineInterface";

export interface IHistory{
    receipt_id: number,
    date: string,
    total: number,
    user_id: number,
    lines: receiptLine[];
}