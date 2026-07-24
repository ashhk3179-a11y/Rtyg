The Check-In feature in my WIP Management System is returning HTTP 500 even though the frontend sends valid data.

Current behavior:
- Frontend sends JSON:
{
  "productId": 6,
  "rackId": 2,
  "quantity": 12,
  "employeeId": 3
}
- InventoryController uses:
[HttpPost("checkin")]
public async Task<IActionResult> CheckIn([FromBody] CheckInDto dto)

- The API enters the controller but returns HTTP 500.
- Frontend sometimes shows:
"Quantity must be positive"
even though quantity is greater than zero.

Your task is to debug the entire Check-In flow automatically.

Check every layer:
1. React CheckIn.jsx
2. API request body
3. CheckInDto model
4. InventoryController
5. IInventoryService
6. InventoryService.CheckInAsync()
7. Entity Framework SaveChanges
8. ApplicationDbContext
9. Entity relationships
10. SQL database values

Find the exact line causing the exception.
Do not guess.

Requirements:
- Add temporary logging where necessary.
- Catch exceptions and display the real exception message.
- Remove incorrect validations.
- Fix the root cause instead of hiding the exception.
- Ensure Rack.Occupied updates.
- Ensure WipInventory updates.
- Ensure CheckIn history is inserted.
- Ensure AuditHistory is inserted.
- Ensure SaveChangesAsync succeeds.
- Return proper HTTP status codes.

After fixing:
- Remove temporary debugging logs.
- Explain exactly what caused the bug.
- Show every file modified.
- Show every code change.
- Do not rewrite unrelated code.
