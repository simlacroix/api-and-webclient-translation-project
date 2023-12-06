using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TranslationProject.Server.Models;

namespace TranslationProject.Server.Data
{
    public class DataContext : IdentityDbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        // public DbSet<TranslationEntry> TranslationEntries => Set<TranslationEntry>();
        public DbSet<TranslationEntry> TranslationEntries
        {
            get
            {
                return Set<TranslationEntry>();
            }
        }

        
    }
}
