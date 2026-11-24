namespace Ritm.Data.Entities;

public class ProgramDay
{
	
	public int Id { get; set; }
	public int ProgramId { get; set; }
	public int DayNumber { get; set; }
	public string Title { get; set; } = null!;
	public int? WeekDay { get; set; }

  public WorkoutProgram Program { get; set; } = null!;
	public List<ProgramExercise> Exercises { get; set; } = new();

}