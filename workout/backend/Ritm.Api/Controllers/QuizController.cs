using Microsoft.AspNetCore.Mvc;
using Ritm.Services;

namespace Ritm.Api.Controllers;

[ApiController]
[Route("api/quiz")]
public class QuizController : ControllerBase
{
    private readonly QuizService _quiz;

    public QuizController(QuizService quiz) => _quiz = quiz;

    [HttpPost("recommend")]
    public async Task<ActionResult<RecommendationDto>> Recommend(QuizAnswersDto answers)
    {
        var error = ProgramPicker.Validate(answers);
        if (error is not null) return BadRequest(new { error });

        return await _quiz.RecommendAsync(answers);
    }
}
