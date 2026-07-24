Fix the ASP.NET Core Inventory Check-In API to use a DTO instead of query parameters.

Current problem:
- The React frontend sends JSON using:
  Content-Type: application/json
  body: JSON.stringify({
      productId,
      rackId,
      quantity,
      employeeId
  });

- But the backend InventoryController currently expects:
  [FromQuery] int productId,
  [FromQuery] int rackId,
  [FromQuery] int quantity,
  [FromQuery] int employeeId

Because of this, all values become 0 and the service throws:
"Quantity must be positive."

Implement the following changes:

1. Create a DTO named CheckInDto with:
   - ProductId
   - RackId
   - Quantity
   - EmployeeId

2. Modify InventoryController CheckIn action to:

[HttpPost("checkin")]
public async Task<IActionResult> CheckIn([FromBody] CheckInDto dto)

3. Pass dto.ProductId, dto.RackId, dto.Quantity and dto.EmployeeId to InventoryService.CheckInAsync().

4. Do NOT modify InventoryService business logic.

5. Preserve JWT Authorization and existing role-based authorization.

6. Return proper HTTP responses:
   - 200 for success
   - 400 for validation errors
   - 404 if required entities are missing
   - 500 only for unexpected exceptions

7. Remove all old [FromQuery] parameters from CheckIn.

8. Ensure the API works directly with the existing React frontend without changing the frontend request.

Generate the complete updated CheckInDto class and the complete updated InventoryController CheckIn method.
