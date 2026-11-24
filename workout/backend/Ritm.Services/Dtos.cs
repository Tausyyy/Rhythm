namespace Ritm.Services;

// То, что уходит в JSON на фронт (имена полей станут camelCase).
public record QuizAnswersDto(string Goal, string Experience, int DaysPerWeek, string Place);

public record ExerciseDto(int Id, string Name, string MuscleGroup, string Equipment, string? Description);

public record ProgramExerciseDto(int ExerciseId, string Name, string MuscleGroup, int Sets, int RepsMin, int RepsMax);

public record ProgramDayDto(int DayNumber, string Title, List<ProgramExerciseDto> Exercises);

public record ProgramDto(int Id, string Name, string Level, int DaysPerWeek, string Place, List<ProgramDayDto> Days);

public record RecommendationDto(ProgramDto Program, string? Note);
