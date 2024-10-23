using System;
using System.Collections.Generic;

namespace ReceiptProject.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public string? ProdDescription { get; set; }

    public decimal? Price { get; set; }

    public int? FpaCategory { get; set; }

    public int? Inventory { get; set; }

    public bool IsDeleted { get; set; }

    public virtual ICollection<ReceiptLine> ReceiptLines { get; set; } = new List<ReceiptLine>();
}
