Modify the existing ASP.NET Core WIP Management backend.

Do NOT change authentication, JWT, login or existing database tables unless necessary.

The Checkout process must work like an approval workflow.

Requirements:

1. Checkout Request
- Employee creates a checkout request.
- Request must NOT reduce inventory immediately.
- Save the request in CheckOut table.
- Default Status = "Pending".

2. Use CheckOutDto

Create:

public class CheckOutDto
{
    public int WipInventoryId { get; set; }
    public int Quantity { get; set; }
    public int EmployeeId { get; set; }
}

3. InventoryController

Replace Checkout endpoint.

Current endpoint uses FromQuery.

Change it to:

POST /api/Inventory/checkout

using

[FromBody] CheckOutDto

Call

CheckOutAsync(dto.WipInventoryId,
dto.Quantity,
dto.EmployeeId)

4. Validation

Reject request if:

Quantity <= 0

Inventory not found

Requested Quantity > Current Inventory Quantity

Return proper BadRequest message.

5. Notification

Create notification for Admin.

Notification should contain

Employee ID

Employee Name

Product Code

Product Name

Quantity

Date

Status = Pending

Title

"New Checkout Request"

6. Approval

Existing ApproveCheckOutAsync should

Reduce Inventory

Reduce Rack Occupied

Update Checkout Status = Approved

Save Audit

Create notification to Employee

"Your checkout request has been Approved."

7. Reject

Reject should

Only change Status = Rejected

Inventory must remain unchanged.

Create notification

"Your checkout request has been Rejected."

8. GetAll Inventory

Current API returns only

ProductId

RackId

Quantity

Modify GetAllAsync()

Include

Product

Rack

Warehouse

Return DTO containing

ProductName

ProductCode

RackCode

WarehouseName

Rack Capacity

Occupied

Status

Quantity

LastUpdated

Use Entity Framework Include()

.Include(Product)

.Include(Rack)

.ThenInclude(Warehouse)

9. Logging

Log

Checkout Requested

Checkout Approved

Checkout Rejected

10. Keep all existing APIs working.

Do not break CheckIn.
