Implement the following workflow without breaking Login, JWT Authentication, Products, Employees, Dashboard, Inventory, Racks or existing APIs.

Use the existing architecture (Repository, Service, Controller, DTOs).

=====================================
1. INVENTORY PERMISSIONS
=====================================

Admin:
- Full CRUD
- Approve Checkout
- View all requests
- Receive notifications

Employee:
- Can View Inventory
- Can Create Inventory
- Cannot Delete Inventory
- Cannot Edit Existing Inventory
- Can Request Checkout
- Cannot directly perform Checkout

Supervisor:
- View Inventory
- Check-In
- View Requests

=====================================
2. INVENTORY CREATED BY EMPLOYEE
=====================================

When an Employee creates Inventory:

- Save inventory successfully.
- Store CreatedByEmployeeId.
- Store CreatedDate.
- Automatically create notification:

Title:
New Inventory Created

Message:
Employee {EmployeeCode} created Inventory for Product {ProductCode} in Rack {RackCode}.

Recipient:
Admin

Status:
Unread

=====================================
3. CHECK IN
=====================================

Employee and Supervisor can perform Check-In directly.

Update:

Inventory Quantity

Rack Occupied

LastUpdated

Create notification for Admin.

=====================================
4. CHECK OUT REQUEST
=====================================

Employee cannot checkout directly.

Instead:

Create CheckoutRequest table:

CheckoutRequestId

InventoryId

EmployeeId

Quantity

Status
(Pending, Approved, Rejected)

RequestedDate

ApprovedBy

ApprovedDate

Reason

When employee clicks Checkout:

DO NOT reduce inventory.

Create Pending Request.

Notify Admin.

=====================================
5. ADMIN APPROVAL
=====================================

Admin Dashboard should display Pending Requests.

Admin can:

Approve

Reject

If Approved:

Reduce Inventory Quantity

Update Rack Occupied

Update LastUpdated

Change Request Status = Approved

Notify Employee

If Rejected:

Status = Rejected

Notify Employee

=====================================
6. NOTIFICATION SYSTEM
=====================================

Notifications should work for both Admin and Employee.

Unread Count

Mark As Read

Latest First

Real-time refresh

Notification Types:

Inventory Created

CheckIn

Checkout Requested

Checkout Approved

Checkout Rejected

=====================================
7. FIX WIP PAGE
=====================================

Current issue:

Loading production data
404

Find the incorrect API endpoint.

Use the existing backend route.

Do not return 404.

Do not hardcode URLs.

=====================================
8. BACKWARD COMPATIBILITY
=====================================

Do not rename APIs.

Do not break Swagger.

Do not modify Login.

Do not modify JWT.

Do not modify Products.

Do not remove existing Inventory endpoints.

Only extend functionality.
.
.

Update only the React frontend.

Do not modify Login, JWT, Products, Dashboard or existing navigation.

=====================================
1. ROLE BASED UI
=====================================

Admin:

Full Inventory Management

Checkout Approval Page

Notifications

Employee:

View Inventory

Create Inventory

Check-In

Request Checkout

Cannot Delete

Cannot Edit

Supervisor:

View Inventory

Check-In

=====================================
2. INVENTORY CREATE
=====================================

After Employee creates Inventory:

Show success toast.

Automatically refresh Inventory table.

=====================================
3. CHECKOUT
=====================================

Employee Checkout button should NOT reduce inventory.

Instead:

Open Request Dialog.

Ask:

Quantity

Reason

Submit Request

Show:

Request Submitted Successfully

=====================================
4. ADMIN REQUEST PAGE
=====================================

Create page:

Checkout Requests

Pending

Approved

Rejected

Buttons:

Approve

Reject

=====================================
5. APPROVE
=====================================

After Approve:

Refresh Inventory

Refresh Notifications

Refresh Dashboard

=====================================
6. NOTIFICATIONS
=====================================

Admin receives:

Inventory Created

Check-In

Checkout Requested

Employee receives:

Checkout Approved

Checkout Rejected

Unread badge.

Auto refresh every 30 seconds.

=====================================
7. FIX WIP PAGE
=====================================

Current error:

Loading production data

404

Fix frontend API URL.

Use correct backend endpoint.

Show friendly message if no production exists.

=====================================
8. QUALITY
=====================================

No console errors.

No 404 errors.

No duplicate API calls.

Use existing Axios instance.

Do not modify Login.

Do not break existing modules.
