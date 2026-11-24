using Microsoft.EntityFrameworkCore;
using Ritm.Data;

namespace Ritm.Services;

public class QuizService
{
    private readonly AppDbContext _db;

    public QuizService(AppDbContext db) => _db = db;   // DI: контекст подставит сам ASP.NET Core

    public async Task<RecommendationDto> RecommendAsync(QuizAnswersDto answers)
    {
        var templates = await _db.WorkoutPrograms
            .Where(p => p.UserId == null)
            .Include(p => p.Days).ThenInclude(d => d.Exercises).ThenInclude(e => e.Exercise)
            .AsSplitQuery()
            .ToListAsync();

        var (program, note) = ProgramPicker.Pick(answers, templates);
        return new RecommendationDto(ProgramMapper.ToDto(program, answers.Goal), note);
    }
}
