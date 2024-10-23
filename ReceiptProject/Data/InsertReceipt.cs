using ReceiptProject.Models;

namespace ReceiptProject.Data
{
    public class InsertReceipt
    {
       

        public int? RegisterId { get; set; }

        public int? EmpId { get; set; }

        public DateTime? RecTime { get; set; }

     

        public string? PaymentType { get; set; }

        

        public virtual ICollection<ReceiptLine> ReceiptLines { get; set; } = new List<ReceiptLine>();

        
    }
}
