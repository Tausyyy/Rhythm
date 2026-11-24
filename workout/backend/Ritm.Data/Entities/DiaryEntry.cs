namespace Ritm.Data.Entities;

public class DiaryEntry
{
    public int Id { get; set; }
    public string UserId { get; set; } = "";
    public int ExerciseId { get; set; }
    public DateOnly Date { get; set; }
    public decimal Weight { get; set; }

    public Exercise Exercise { get; set; } = null!;
}