using System;
using System.Collections.Generic;

namespace ReceiptProject.Models;

public partial class CashRegister
{
    public int RegisterId { get; set; }

    public string? RegisterDescription { get; set; }

    public virtual ICollection<Receipt> Receipts { get; set; } = new List<Receipt>();
}
