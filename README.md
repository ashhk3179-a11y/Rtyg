Modify only the React frontend.

Do not change backend APIs.

Checkout workflow must support approval process.

Requirements

1.

Employee selects inventory.

2.

Display Inventory Card.

Show

Product

Product Code

Rack

Warehouse

Capacity

Occupied

Available Stock

Status

Progress Bar

3.

Show Employee ID automatically.

Read

employeeId

from localStorage.

Display it in a readonly textbox.

Do not allow editing.

4.

Checkout Form

Employee ID (Readonly)

Checkout Quantity

Destination Dropdown

5.

Destination options

Shop Floor

Assembly

Production

Quality Check

Dispatch

6.

Validation

Quantity > 0

Quantity <= Available Stock

Disable button when invalid.

7.

POST

/api/Inventory/checkout

Send JSON

{
wipInventoryId,
quantity,
employeeId
}

8.

Success

Show

"Checkout Request Sent Successfully.

Waiting for Admin Approval."

Do NOT reduce inventory.

Do NOT update available quantity.

Inventory changes only after Admin Approval.

9.

Admin Notification page

Show

Employee ID

Employee Name

Product

Quantity

Status

Date

Approve button

Reject button

10.

Employee Notification page

Pending

Approved

Rejected

should be displayed using badge colors.

Pending = Yellow

Approved = Green

Rejected = Red

11.

UI

Professional Bootstrap dashboard

No empty spaces

Responsive

Keep same theme as CheckIn page.
