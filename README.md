Fix the Checkout and Notification pages.

Do NOT change backend URLs.

Requirements

1.

Checkout page must submit JSON.

POST

/api/Inventory/checkout

Headers

Content-Type: application/json

Authorization: Bearer Token

Body

{
    wipInventoryId,
    quantity,
    employeeId
}

Do not use query parameters.

---------------------------------------------------

2.

Checkout page

Display

Product

Product Code

Rack

Warehouse

Capacity

Occupied

Available

Status

Progress Bar

Employee ID (Readonly)

Quantity

Destination

---------------------------------------------------

3.

Employee ID

Read automatically from localStorage.

Never allow editing.

---------------------------------------------------

4.

Validation

Quantity > 0

Quantity <= Available

Disable button if invalid.

---------------------------------------------------

5.

Success Message

Checkout Request Submitted Successfully.

Waiting for Admin Approval.

Do not reduce inventory.

---------------------------------------------------

6.

Notification Page

Display

Employee Name

Employee ID

Product

Quantity

Status

Date

---------------------------------------------------

7.

Approve button

Do NOT send NotificationId.

Send CheckOutId.

POST

/api/Inventory/checkout/approve/{checkOutId}

---------------------------------------------------

8.

Reject button

POST

/api/Inventory/checkout/reject/{checkOutId}

---------------------------------------------------

9.

After Approve

Refresh

Notifications

Inventory

Dashboard

Rack

---------------------------------------------------

10.

After Reject

Refresh Notifications.

Inventory must remain unchanged.

---------------------------------------------------

11.

Remove

"Unable to locate matching checkout request"

by using CheckOutId instead of NotificationId.

---------------------------------------------------

12.

Use Bootstrap only.

Responsive.

Professional UI.

Do not modify Login or Check-In.
