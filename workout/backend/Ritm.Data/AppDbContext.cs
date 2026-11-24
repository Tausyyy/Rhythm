using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Ritm.Data.Entities;

namespace Ritm.Data;

public class AppDbContext : IdentityDbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Exercise> Exercises => Set<Exercise>();
		public DbSet<WorkoutProgram> WorkoutPrograms => Set<WorkoutProgram>();
		public DbSet<WorkoutLog> WorkoutLogs => Set<WorkoutLog>();
		public DbSet<ProgramExercise> ProgramExercises => Set<ProgramExercise>();
		public DbSet<ProgramDay> ProgramDays => Set<ProgramDay>();
		public DbSet<DiaryEntry> DiaryEntries => Set<DiaryEntry>();

		
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder); 
				builder.Entity<DiaryEntry>().Property(e => e.Weight).HasPrecision(6, 2);
        
    }
}