I have an ASP.NET Core 8 Web API project for WIP Management.

Current status:
- Employee CRUD works.
- Admin can open Edit Access dialog.
- Access is saved into Employee.Access column.
- Edit employee also works.
- JWT authentication works.

Problems:
1. Login API response does not include employee Access permissions.
2. JWT token does not always contain the "access" claim.
3. Frontend cannot determine which modules an employee can access.
4. Access permissions are saved in the database but are not reflected after employee login.
5. Unauthorized routes occur because login response lacks permission information.

Fix the backend without changing existing API routes.

Requirements:

1. Employee model
- Keep Access as comma-separated string.
Example:
Dashboard,Inventory,Check-In,Reports

2. LoginResponse DTO must include:
- Token
- EmployeeId
- EmployeeCode
- Name
- Role
- Email
- Access

3. AuthService
When login succeeds:
- Read Employee.Access from database.
- Add JWT claim:
new Claim("access", employee.Access ?? "")

Return LoginResponse:

Token
EmployeeId
EmployeeCode
Name
Role
Email
Access

4. AuthenticateByEmailAsync
Must also return Access.

5. Ensure Employee.Access is loaded from database.

6. EmployeeController PUT /access
Must update Employee.Access correctly.

7. EmployeeController PUT /employee
Must not overwrite Access unless access is intentionally updated.

8. Delete employee must work.

9. Add proper validation and logging.

10. Return proper HTTP status codes.

Do NOT change database schema.
Do NOT rename existing endpoints.
Only fix authentication, login response and access permission flow.

Finally provide complete updated code for every modified file.

..

.

I have a React WIP Management application.

Backend already stores employee permissions in Employee.Access as a comma-separated string.

Problems:

1. Sidebar becomes blank after employee login.
2. Unauthorized page appears even when access is granted.
3. Admin successfully saves permissions but employee cannot see updated menu after logging in again.
4. Edit Employee should work without affecting permissions.
5. Delete Employee should work.
6. Sidebar should display only allowed modules.
7. After permission update, employee should see changes after next login.
8. Old permission data should not remain in localStorage.

Fix the frontend without changing API routes.

Requirements:

1. Login
After successful login store:

token
employeeId
employeeCode
role
name
email
access

inside localStorage.

2. Parse permissions:

const permissions =
(localStorage.getItem("access") || "")
.split(",")
.map(x=>x.trim())
.filter(Boolean);

3. Sidebar

Show only modules included in permissions.

Example:

Dashboard
Inventory
Products
Reports
Notifications
Check-In
Check-Out
WIP
Racks
Prediction
Employees

Hide everything else.

4. ProtectedRoute

Before rendering page:

if permission exists
allow

else

redirect to /unauthorized

5. Unauthorized page

Display:

"You are not authorized to access this module."

6. After login

Reload permissions from localStorage.

7. After logout

Clear every authentication item.

8. Employee Edit

Edit API should send every required field:

Name
Email
Department
Shift
Role

Do not send null values.

9. Access dialog

Load saved permissions.

Save permissions.

Refresh employee list after save.

10. UI

Sidebar must never disappear.

Show loading while permissions are loading.

Show success/error toast messages.

Do not rewrite the project.
Modify only necessary files.

Finally provide complete updated code for every modified file.
