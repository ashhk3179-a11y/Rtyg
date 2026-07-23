using Microsoft.AspNetCore.Mvc;
using wipmanagement.api.DTOs;
using wipmanagement.api.Interfaces.Services;

namespace wipmanagement.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;

        public InventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        [HttpPost("checkin")]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Admin,Employee")]
        public async Task<IActionResult> CheckIn([FromQuery] int productId, [FromQuery] int rackId, [FromQuery] int quantity, [FromQuery] int employeeId)
        {
            var res = await _inventoryService.CheckInAsync(productId, rackId, quantity, employeeId);
            return Ok(res);
        }

        [HttpPost("checkout")]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Admin,Employee")]
        public async Task<IActionResult> CheckOut([FromQuery] int wipInventoryId, [FromQuery] int quantity, [FromQuery] int employeeId)
        {
            try
            {
                var res = await _inventoryService.CheckOutAsync(wipInventoryId, quantity, employeeId);
                return Ok(res);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Admin,Supervisor,Employee")]
        public async Task<IActionResult> GetAll()
        {
            var list = await _inventoryService.GetAllAsync();
            return Ok(list);
        }

        [HttpPost]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] DTOs.WipInventoryDto dto)
        {
            var res = await _inventoryService.CreateInventoryAsync(dto.ProductId, dto.RackId, dto.Quantity);
            return CreatedAtAction(nameof(GetById), new { id = res.WipInventoryId }, res);
        }

        [HttpGet("{id}")]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Admin,Supervisor,Employee")]
        public async Task<IActionResult> GetById(int id)
        {
            var res = await _inventoryService.GetByIdAsync(id);
            if (res == null) return NotFound();
            return Ok(res);
        }

        [HttpPut("{id}")]
        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] DTOs.WipInventoryDto dto)
        {
            if (id != dto.WipInventoryId) return BadRequest();
            try
            {
                var res = await _inventoryService.UpdateInventoryAsync(id, dto.Quantity);
                return Ok(res);
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
            var ok = await _inventoryService.SoftDeleteInventoryAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
