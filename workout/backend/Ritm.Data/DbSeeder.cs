namespace Ritm.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (db.Exercises.Any()) return;   

        var data = SeedData.Create();
        db.Exercises.AddRange(data.Exercises);
        db.WorkoutPrograms.AddRange(data.Programs); 
        db.SaveChanges();
    }
}
