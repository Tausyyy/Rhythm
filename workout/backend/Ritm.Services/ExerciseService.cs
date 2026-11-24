using Microsoft.EntityFrameworkCore;
using Ritm.Data;

namespace Ritm.Services;

public class ExerciseService
{
    private readonly AppDbContext _db;

    public ExerciseService(AppDbContext db) => _db = db;

    public async Task<List<ExerciseDto>> GetAllAsync(string? muscleGroup)
    {
        var query = _db.Exercises.AsQueryable();
        if (!string.IsNullOrWhiteSpace(muscleGroup))
            query = query.Where(e => e.MuscleGroup == muscleGroup);

        return await query
            .OrderBy(e => e.MuscleGroup).ThenBy(e => e.Name)
            .Select(e => new ExerciseDto(e.Id, e.Name, e.MuscleGroup, e.Equipment, e.Description))
            .ToListAsync();
    }
}
