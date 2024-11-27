import { EmailValidator } from "@angular/forms";
import { Employee } from "./employeeInterface";
import { receiptLine } from "./receiptLineInterface";
import { CashRegister } from "./CashRegisterInterface";


export interface Receipt {
    OrderId: number,
    RegisterId: number,
    EmpiId: number,
    RecTime: string,
    Freight: number,
    Fpa: number,
    TotalCost: number,
    PaymentType: number,
    Emp: Employee,
    ReceiptLines: receiptLine[],
    // Register: CashRegister
    
}

// public int OrderId { get; set; }

// public int? RegisterId { get; set; }

// public int? EmpId { get; set; }

// public DateTime? RecTime { get; set; }

// public decimal? Freight { get; set; }

// public decimal? Fpa { get; set; }

// public decimal? TotalCost { get; set; }

// public string? PaymentType { get; set; }

// [JsonIgnore]
// public virtual Employee? Emp { get; set; }

// public virtual ICollection<ReceiptLine> ReceiptLines { get; set; } = new List<ReceiptLine>();

// public virtual CashRegister? Register { get; set; }