using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ReceiptProject.Models;

public partial class ReceiptDbContext : DbContext
{
    public ReceiptDbContext()
    {
    }

    public ReceiptDbContext(DbContextOptions<ReceiptDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CashRegister> CashRegisters { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Receipt> Receipts { get; set; }

    public virtual DbSet<ReceiptLine> ReceiptLines { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=(local);Initial Catalog=receipted;Integrated Security=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CashRegister>(entity =>
        {
            entity.HasKey(e => e.RegisterId).HasName("PK__CashRegi__1418262FD182AEF6");

            entity.Property(e => e.RegisterId)
                .ValueGeneratedNever()
                .HasColumnName("register_id");
            entity.Property(e => e.RegisterDescription)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("register_description");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmpId).HasName("PK__Employee__1299A861FC1C0943");

            entity.Property(e => e.EmpId)
                .ValueGeneratedNever()
                .HasColumnName("emp_id");
            entity.Property(e => e.Firstname)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("firstname");
            entity.Property(e => e.Lastname)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lastname");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Products__47027DF5991514F9");

            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.FpaCategory).HasColumnName("fpa_category");
            entity.Property(e => e.Inventory).HasColumnName("inventory");
            entity.Property(e => e.Price)
                .HasColumnType("money")
                .HasColumnName("price");
            entity.Property(e => e.ProdDescription)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("prod_description");
        });

        modelBuilder.Entity<Receipt>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Receipts__46596229B7919EEC");

            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.EmpId).HasColumnName("emp_id");
            entity.Property(e => e.Fpa)
                .HasColumnType("money")
                .HasColumnName("fpa");
            entity.Property(e => e.Freight)
                .HasColumnType("money")
                .HasColumnName("freight");
            entity.Property(e => e.PaymentType)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("payment_type");
            entity.Property(e => e.RecTime)
                .HasColumnType("datetime")
                .HasColumnName("rec_time");
            entity.Property(e => e.RegisterId).HasColumnName("register_id");
            entity.Property(e => e.TotalCost)
                .HasColumnType("money")
                .HasColumnName("total_cost");

            entity.HasOne(d => d.Emp).WithMany(p => p.Receipts)
                .HasForeignKey(d => d.EmpId)
                .HasConstraintName("fk_emp");

            entity.HasOne(d => d.Register).WithMany(p => p.Receipts)
                .HasForeignKey(d => d.RegisterId)
                .HasConstraintName("fk_register");
        });

        modelBuilder.Entity<ReceiptLine>(entity =>
        {
            entity.HasKey(e => e.InstId).HasName("PK__ReceiptL__0206940D08078E8A");

            entity.Property(e => e.InstId).HasColumnName("inst_id");
            entity.Property(e => e.Fpa).HasColumnName("fpa");
            entity.Property(e => e.Freight)
                .HasColumnType("money")
                .HasColumnName("freight");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");

            entity.HasOne(d => d.Order).WithMany(p => p.ReceiptLines)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("fk_order")
                .OnDelete(DeleteBehavior.SetNull);


            entity.HasOne(d => d.Product).WithMany(p => p.ReceiptLines)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("fk_prod")
                .OnDelete(DeleteBehavior.SetNull);

        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
