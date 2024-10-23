using System;
using System.Collections.Generic;

namespace ReceiptProject.Models;

public partial class Employee
{
    public int EmpId { get; set; }

    public string? Username { get; set; }

    public string? Firstname { get; set; }

    public string? Lastname { get; set; }

    public virtual ICollection<Receipt> Receipts { get; set; } = new List<Receipt>();
}
