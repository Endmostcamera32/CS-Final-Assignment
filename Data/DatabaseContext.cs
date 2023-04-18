using Microsoft.EntityFrameworkCore;
using CS_chatApp.Models;
namespace CS_chatApp.Data;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options) { }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Message>()
            .Property(e => e.CreatedAt)
            .HasDefaultValueSql("now()");
        modelBuilder.Entity<Channel>()
            .Property(e => e.CreatedAt)
            .HasDefaultValueSql("now()");
    }
    public DbSet<Channel> Channels => Set<Channel>();
    public DbSet<Message> Messages => Set<Message>();
    public DbSet<User> Users => Set<User>();
}