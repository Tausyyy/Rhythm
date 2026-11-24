namespace Ritm.Data.Entities;

public class WorkoutProgram
{
    public int Id { get; set; }
    public string? UserId { get; set; }      
    public string Name { get; set; } = "";
    public string Level { get; set; } = "";     
    public int DaysPerWeek { get; set; }
    public string Place { get; set; } = "";      

    public List<ProgramDay> Days { get; set; } = new();   
}