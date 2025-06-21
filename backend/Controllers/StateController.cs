using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StateController(IStateService stateService) : ControllerBase
{
    [HttpGet("status")]
    public IActionResult GetStatus([FromQuery] string userId)
    {
        bool isBusy = stateService.IsMachineBusy();
        bool isCurrentUser = stateService.TryAcquireLock(userId);
        
        return Ok(new 
        {
            IsBusy = isBusy,
            IsCurrentUser = isCurrentUser
        });
    }
    
    [HttpPost("release")]
    public IActionResult Release([FromQuery] string userId)
    {
        stateService.ReleaseLock(userId);
        return Ok();
    }
}