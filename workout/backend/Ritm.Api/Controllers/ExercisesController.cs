using Microsoft.AspNetCore.Mvc;
using Ritm.Services;

namespace Ritm.Api.Controllers;

[ApiController]
[Route("api/exercises")]
public class ExercisesController : ControllerBase
{
    private readonly ExerciseService _exercises;

    public ExercisesController(ExerciseService exercises) => _exercises = exercises;

    // GET /api/exercises  или  /api/exercises?muscleGroup=Грудь
    [HttpGet]
    public async Task<List<ExerciseDto>> Get([FromQuery] string? muscleGroup)
        => await _exercises.GetAllAsync(muscleGroup);
}
