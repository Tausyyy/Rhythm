namespace Ritm.Data.Entities;
public class ProgramExercise
{
	
	public int Id { get; set; }
	public int ProgramDayId { get; set; }
	public int ExerciseId { get; set; }
	public int Sets { get; set; }
	public int RepsMin { get; set; }
	public int RepsMax { get; set; }
	public int Position { get; set; }

	public ProgramDay Day { get; set; } = null!;
	public Exercise Exercise { get; set; } = null!;
}