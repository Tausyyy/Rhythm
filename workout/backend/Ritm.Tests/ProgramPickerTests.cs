using Ritm.Data;
using Ritm.Data.Entities;
using Ritm.Services;
using Xunit;

namespace Ritm.Tests;

public class ProgramPickerTests
{
    private static readonly List<WorkoutProgram> Templates = SeedData.Create().Programs;

    public static IEnumerable<object[]> AllCombinations()
    {
        foreach (var experience in ProgramPicker.Experiences)
        foreach (var days in ProgramPicker.DaysOptions)
        foreach (var place in ProgramPicker.Places)
            yield return new object[] { experience, days, place };   // 3 x 3 x 3 = 27
    }

    [Theory]
    [MemberData(nameof(AllCombinations))]
    public void Every_combination_gets_a_program(string experience, int days, string place)
    {
        var answers = new QuizAnswersDto("mass", experience, days, place);

        var (program, _) = ProgramPicker.Pick(answers, Templates);

        Assert.Equal(place, program.Place);
        Assert.True(program.DaysPerWeek <= days);
    }

    [Fact]
    public void Beginner_with_four_days_gets_three_and_a_note()
    {
        var answers = new QuizAnswersDto("mass", "never", 4, "gym");

        var (program, note) = ProgramPicker.Pick(answers, Templates);

        Assert.Equal(3, program.DaysPerWeek);
        Assert.NotNull(note);
    }

    [Fact]
    public void Experienced_in_gym_gets_four_days()
    {
        var answers = new QuizAnswersDto("strength", "over6", 4, "gym");

        var (program, note) = ProgramPicker.Pick(answers, Templates);

        Assert.Equal(4, program.DaysPerWeek);
        Assert.Null(note);
    }
}
