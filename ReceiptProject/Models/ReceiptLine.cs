using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ReceiptProject.Models;

public partial class ReceiptLine
{
    public int InstId { get; set; }

    public int? OrderId { get; set; }

    public int? ProductId { get; set; }

    public decimal? Freight { get; set; }

    public int? Quantity { get; set; }

    public int? Fpa { get; set; }

    [JsonIgnore]
    public virtual Receipt? Order { get; set; }
    [JsonIgnore]
    public virtual Product? Product { get; set; }
}
