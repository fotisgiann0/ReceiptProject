using System;
using System.Collections.Generic;

namespace ReceiptProject.Models;

public partial class Receipt
{
    public int OrderId { get; set; }

    public int? RegisterId { get; set; }

    public int? EmpId { get; set; }

    public DateTime? RecTime { get; set; }

    public decimal? Freight { get; set; }

    public decimal? Fpa { get; set; }

    public decimal? TotalCost { get; set; }

    public string? PaymentType { get; set; }

    public virtual Employee? Emp { get; set; }

    public virtual ICollection<ReceiptLine> ReceiptLines { get; set; } = new List<ReceiptLine>();

    public virtual CashRegister? Register { get; set; }
}
