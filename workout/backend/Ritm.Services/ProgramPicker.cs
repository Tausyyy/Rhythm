using Ritm.Data.Entities;

namespace Ritm.Services;

// Чистая функция без базы: ответы анкеты + список шаблонов -> нужный шаблон.
// Благодаря этому её легко тестировать.
public static class ProgramPicker
{
    public static readonly string[] Goals = { "lose", "mass", "strength", "shape" };
    public static readonly string[] Experiences = { "never", "under6", "over6" };
    public static readonly int[] DaysOptions = { 2, 3, 4 };
    public static readonly string[] Places = { "gym", "home-dumbbells", "home-bodyweight" };

    public static string? Validate(QuizAnswersDto a)
    {
        if (!Goals.Contains(a.Goal)) return "Неизвестная цель";
        if (!Experiences.Contains(a.Experience)) return "Неизвестный опыт";
        if (!DaysOptions.Contains(a.DaysPerWeek)) return "Дней в неделю может быть 2, 3 или 4";
        if (!Places.Contains(a.Place)) return "Неизвестное место занятий";
        return null;
    }

    public static (WorkoutProgram Program, string? Note) Pick(QuizAnswersDto a, IReadOnlyList<WorkoutProgram> templates)
    {
        // 4 дня только в зале и только тем, кто уже занимался
        var maxDays = a.Place == "gym" && a.Experience != "never" ? 4 : 3;
        var days = Math.Min(a.DaysPerWeek, maxDays);

        string? note = null;
        if (days < a.DaysPerWeek)
        {
            note = a.Place == "gym"
                ? "Ты выбрал 4 дня, а для старта мы взяли 3: так проще втянуться."
                : "Для занятий дома у нас есть программы на 2–3 дня, поэтому взяли 3.";
        }

        var program = templates
            .Where(t => t.UserId == null && t.Place == a.Place)
            .OrderBy(t => Math.Abs(t.DaysPerWeek - days))   // запасной ход: ближайшее число дней
            .ThenBy(t => t.DaysPerWeek)
            .FirstOrDefault();

        if (program is null)
            throw new InvalidOperationException($"Нет шаблонов для места {a.Place}");

        return (program, note);
    }
}
