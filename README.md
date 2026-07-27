Fix the Checkout Approval workflow in the ASP.NET Core backend.

Do NOT modify JWT Authentication, Login, Check-In, Products or other working APIs.

Requirements:

1. Checkout API

Replace the existing Checkout endpoint to use JSON request.

Create:

public class CheckOutDto
{
    public int WipInventoryId { get; set; }
    public int Quantity { get; set; }
    public int EmployeeId { get; set; }
}

Controller:

POST /api/Inventory/checkout

Use

[FromBody] CheckOutDto dto

instead of FromQuery.

Call

CheckOutAsync(dto.WipInventoryId,
dto.Quantity,
dto.EmployeeId)

This must remove the 415 Unsupported Media Type error.

---------------------------------------------------

2. Checkout Request

When Employee submits checkout

Create one CheckOut record

Status = Pending

Do NOT reduce inventory.

Do NOT reduce rack occupancy.

---------------------------------------------------

3. Notification

When checkout request is created

Create notification for Admin.

Notification must contain

CheckOutId

EmployeeId

Employee Name

ProductId

Product Name

Quantity

Status

Date

Title

Message

Save CheckOutId inside Notification table.

Do not rely only on NotificationId.

---------------------------------------------------

4. Approve

Approve endpoint must receive CheckOutId.

Find Checkout using CheckOutId.

If Status == Pending

Reduce Inventory Quantity

Reduce Rack Occupied

Status = Approved

Save Audit

Create notification for Employee

"Your Checkout Request has been Approved."

---------------------------------------------------

5. Reject

Receive CheckOutId.

Only update

Status = Rejected

Inventory must NOT change.

Create notification for Employee.

---------------------------------------------------

6. Inventory API

GET /api/Inventory

Include

Product

Rack

Warehouse

Return

ProductName

ProductCode

RackCode

WarehouseName

Capacity

Occupied

Status

Quantity

LastUpdated

using Entity Framework Include().

---------------------------------------------------

7. Logging

Log

Checkout Requested

Checkout Approved

Checkout Rejected

---------------------------------------------------

8. Do not break existing APIs.

Check-In must continue working exactly as before.
