namespace Ritm.Data.Entities;
public class WorkoutLog
{
	
	public int Id { get; set; }
	public string UserId { get; set; } = "";
	public int ProgramDayId { get; set; }
	public DateOnly Date { get; set; }

	public ProgramDay Day { get; set; } = null!;

}