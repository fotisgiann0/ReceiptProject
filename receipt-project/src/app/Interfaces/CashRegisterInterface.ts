import { Receipt } from "./receiptInterface";

export interface CashRegister{
    RegisterId: number,
    RegisterDescription: string,
    Receipts: Receipt[]
}


// public int RegisterId { get; set; }

// public string? RegisterDescription { get; set; }

// public virtual ICollection<Receipt> Receipts { get; set; } = new List<Receipt>();