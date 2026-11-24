using Ritm.Data.Entities;

namespace Ritm.Services;

public static class ProgramMapper
{
    // Цель меняет только диапазон повторений (кроме упражнений на пресс).
    public static ProgramDto ToDto(WorkoutProgram p, string goal)
    {
        var (min, max) = goal switch
        {
            "strength" => (5, 8),
            "mass" => (8, 12),
            "lose" => (12, 15),
            _ => (10, 15)   // shape
        };

        var days = p.Days.OrderBy(d => d.DayNumber).Select(d => new ProgramDayDto(
            d.DayNumber,
            d.Title,
            d.Exercises.OrderBy(e => e.Position).Select(e =>
            {
                var core = e.Exercise.MuscleGroup == "Пресс";
                return new ProgramExerciseDto(
                    e.ExerciseId, e.Exercise.Name, e.Exercise.MuscleGroup,
                    e.Sets, core ? e.RepsMin : min, core ? e.RepsMax : max);
            }).ToList())).ToList();

        return new ProgramDto(p.Id, p.Name, p.Level, p.DaysPerWeek, p.Place, days);
    }
}
