using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;
using wipmanagement.api.DTOs;
using wipmanagement.api.Interfaces.Services;

namespace wipmanagement.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RackController : ControllerBase
    {
        private readonly IRackService _rackService;

        public RackController(IRackService rackService)
        {
            _rackService = rackService;
        }

        [HttpPost]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] RackCreateDto dto)
        {
            var created = await _rackService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.RackId }, created);
        }

        [HttpGet("{id}")]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Admin,Supervisor,Employee")]
        public async Task<IActionResult> GetById(int id)
        {
            var r = await _rackService.GetByIdAsync(id);
            if (r == null) return NotFound();
            return Ok(r);
        }

        [HttpGet]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Admin,Supervisor,Employee")]
        public async Task<IActionResult> GetAll()
        {
            var list = await _rackService.GetAllAsync();
            return Ok(list);
        }

        [HttpGet("suggest/{quantity}")]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "admin, supervisor, Employee,Operator")]
        public async Task<IActionResult> GetSuggestedRacks(int quantity)
        {
            var racks = await _rackService.GetSuggestedRacksAsync(quantity);
            return Ok(racks);
        }

        [HttpPut("{id}")]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] RackUpdateDto dto)
        {
            if (id != dto.RackId) return BadRequest();
            try
            {
                var updated = await _rackService.UpdateAsync(dto);
                return Ok(updated);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _rackService.SoftDeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
