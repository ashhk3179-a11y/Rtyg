The backend is already working correctly.

IMPORTANT:

1. Do NOT modify or break any existing functionality.
2. Do NOT rename or delete existing Controllers, Models, DTOs, Services, Repositories, Interfaces, Entity Framework configurations, or API routes.
3. Do NOT modify existing database tables or relationships.
4. Do NOT modify Login, JWT Authentication, Product, Inventory, Warehouse, Rack, Employee, Prediction, Notification, or any existing CRUD functionality.
5. Existing Swagger endpoints must continue working without changes.
6. Only extend the existing authorization logic. Do not rewrite it.

OBJECTIVE

Implement Role-Based Access Control (RBAC) using the existing JWT Authentication and Employee Role.

Use the existing role field (Admin, Supervisor, Employee). Do not create another role table unless one already exists.

ROLE PERMISSIONS

ADMIN

- Full access to all modules.
- Can Add, Edit, Delete Products.
- Can Import Excel.
- Can Download Template.
- Can manage Inventory.
- Can manage Warehouse and Rack.
- Can manage Employees.
- Can manage Notifications.
- Can Approve and Reject Check-Out Requests.
- Can view all reports.
- Can access all APIs.

SUPERVISOR

- Can login.
- Can view Dashboard.
- Can view Products.
- Can view Inventory.
- Can view Warehouse.
- Can view Rack.
- Can view Employees.
- Can view Notifications.
- Cannot Add/Edit/Delete Products.
- Cannot Delete Inventory.
- Cannot Approve or Reject Requests.
- Cannot manage Employees.
- Cannot access Admin-only APIs.

EMPLOYEE

- Can login.
- Can view Dashboard.
- Can view Products.
- Can view Inventory.
- Can perform Check-In.
- Can submit Check-Out Requests.
- Can view only their own Request History.
- Can view only their own Notifications.
- Cannot Add/Edit/Delete Products.
- Cannot modify Inventory directly.
- Cannot access Admin modules.
- Cannot access Supervisor modules.

IMPLEMENTATION

- Use ASP.NET Core Role-Based Authorization.
- Protect APIs using [Authorize(Roles = "...")].
- Do not implement role checking using hardcoded if/else statements throughout the code.
- Reuse the existing JWT token and authentication middleware.
- Ensure unauthorized users receive proper HTTP status codes:
  - 401 Unauthorized (not logged in)
  - 403 Forbidden (logged in but insufficient permissions)

COMPATIBILITY

Do not break the existing frontend.
Do not change API URLs.
Do not change request or response models.
Do not change Swagger configuration.
Maintain backward compatibility with the current project.
