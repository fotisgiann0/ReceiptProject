import { receiptLine } from "./receiptLineInterface";

export interface InsertReceipt{
  RegisterId: number;
  EmpId: number;
  RecTime: number;
  PaymentType: string;
  ReceiptLines: receiptLine[];
}