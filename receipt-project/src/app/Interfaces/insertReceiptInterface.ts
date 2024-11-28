import { receiptLine } from "./receiptLineInterface";
import { insertReceiptLine } from "./insertReceiptLineInterface";

export interface InsertReceipt{
  registerId: number;
  empId: number;
  recTime: string;
  paymentType: string;
  ReceiptLines: insertReceiptLine[];
}