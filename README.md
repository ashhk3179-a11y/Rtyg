Continue from the existing implementation.

IMPORTANT

The backend is already working.

Do NOT rewrite existing modules.

Do NOT break any working functionality.

Do NOT rename Controllers, Models, DTOs, Repositories, Services, Interfaces or API routes.

Do NOT modify Login, JWT Authentication, Employee, Product, Inventory, Notification, Reports, Prediction, Warehouse or existing CRUD APIs unless explicitly required below.

Do NOT modify Entity Framework relationships.

Maintain full backward compatibility.

==========================================================
OBJECTIVE
==========================================================

Improve Rack and Inventory management using the existing project architecture.

==========================================================
DEFAULT RACK INITIALIZATION
==========================================================

When the application starts or when the first GET /api/Rack request is executed,

check whether the Rack table contains any records.

If no records exist,

automatically create default Rack records.

Create exactly these racks.

RACK-A1
Capacity = 100
Occupied = 0

RACK-A2
Capacity = 100
Occupied = 0

RACK-A3
Capacity = 100
Occupied = 0

RACK-B1
Capacity = 100
Occupied = 0

RACK-B2
Capacity = 100
Occupied = 0

RACK-B3
Capacity = 100
Occupied = 0

RACK-C1
Capacity = 100
Occupied = 0

RACK-C2
Capacity = 100
Occupied = 0

RACK-C3
Capacity = 100
Occupied = 0

Before inserting,

check RackCode.

Never create duplicate Rack records.

Running the application multiple times must never insert duplicates.

==========================================================
RACK PAGE
==========================================================

GET /api/Rack should immediately return these records.

Frontend should never display

"No Rack Data Available"

after initialization.

==========================================================
PRODUCT CREATION
==========================================================

When a Product is created successfully,

automatically create Inventory.

The user should never create Inventory manually.

==========================================================
AUTOMATIC RACK ASSIGNMENT
==========================================================

When Inventory is created,

find the first Rack that has available capacity.

Automatically assign that Rack.

Store the RackId inside WipInventory.

==========================================================
RACK OCCUPANCY
==========================================================

After assigning Inventory,

update

Occupied

inside the selected Rack.

Update LastUpdated.

Save everything inside one database transaction.

==========================================================
NO DUPLICATES
==========================================================

If Inventory already exists for the Product,

do NOT create another Inventory.

If default racks already exist,

do NOT recreate them.

==========================================================
NO AVAILABLE RACK
==========================================================

If every Rack is full,

return a proper message.

"No Rack Capacity Available."

Do NOT crash.

==========================================================
PRODUCT DELETE
==========================================================

When a Product is deleted,

handle Inventory consistently.

Do not leave orphan Inventory records.

Update Rack Occupied accordingly.

==========================================================
ENTITY FRAMEWORK
==========================================================

Reuse existing

Repositories

Services

DTOs

Entity Framework Models

Do NOT change database schema.

Do NOT create new tables.

==========================================================
ROLE PERMISSIONS
==========================================================

ADMIN

Full Access

Add Product

Edit Product

Delete Product

Import Excel

Download Template

Manage Inventory

Manage Warehouse

Manage Rack

Manage Employees

Reports

Notifications

Approve Check-Out Requests

SUPERVISOR

View Dashboard

View Products

View Inventory

View Warehouse

View Rack

View Notifications

Cannot

Add Product

Edit Product

Delete Product

Approve Requests

Manage Employees

EMPLOYEE

Login

Dashboard

View Products

Add Product

Edit Product

View Inventory

Check-In

Submit Check-Out Request

View Own Notifications

View Own Request History

Cannot

Delete Product

Delete Inventory

Manage Warehouse

Manage Rack

Manage Employees

Reports

Prediction

Approve Requests

==========================================================
NOTIFICATIONS
==========================================================

Reuse existing Notification module.

Do NOT create another Notification table.

Use existing Notification APIs.

==========================================================
PRESERVE
==========================================================

Do NOT modify

JWT Authentication

Login

Notification APIs

Existing CRUD APIs

Swagger

Database Relationships

Repository Pattern

Entity Framework Models

Maintain full backward compatibility.

==========================================================
EXPECTED WORKFLOW
==========================================================

Application Starts

↓

Check Rack Table

↓

If Empty

↓

Automatically Create

RACK-A1
RACK-A2
RACK-A3
RACK-B1
RACK-B2
RACK-B3
RACK-C1
RACK-C2
RACK-C3

↓

Admin/Employee Creates Product

↓

Inventory Automatically Created

↓

Available Rack Automatically Assigned

↓

Rack Occupied Updated

↓

Inventory Saved

↓

Frontend Immediately Displays Product + Inventory + Rack Information

No manual Inventory creation required.

No duplicate Rack records.

No duplicate Inventory records.

Everything must be saved in SQL Server using the existing architecture without breaking any existing functionality.
