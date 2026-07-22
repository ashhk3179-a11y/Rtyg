Continue from the previous implementation.

Do NOT rewrite or replace any existing code that has already been implemented.

Do NOT modify any working functionality.

Apply only the following changes.

1. Update Role-Based Access

ADMIN

- Full Access.

SUPERVISOR

- View Only.
- Cannot Add/Edit/Delete Products.

EMPLOYEE

- Can View Products.
- Can Add Products.
- Can Edit Products.
- Cannot Delete Products.
- Can Perform Check-In.
- Can Submit Check-Out Requests.
- Can View Own Notifications.
- Can View Own Request History.

2. Preserve existing JWT Authentication.

3. Preserve all existing APIs.

4. Preserve existing Notification module.

5. Preserve existing Database.

6. Do NOT rename Controllers, DTOs, Models or API routes.

Only extend the existing RBAC implementation without breaking compatibility.

.


Continue from the previous frontend implementation.

Do NOT rewrite any completed work.

Do NOT modify any working functionality.

Apply only the following improvements.

1. Profile Dropdown

Add

- My Profile
- Logout

Logout should

- Clear JWT
- Clear User Session
- Redirect to Login

2. Product Page Permissions

ADMIN

- Add
- Edit
- Delete

SUPERVISOR

- View Only

EMPLOYEE

- Add
- Edit

Hide Delete button.

3. Keep Sidebar Role-Based.

4. Keep Dashboard Role-Based.

5. Preserve all existing Backend API integrations.

6. Preserve all existing CRUD operations.

Only implement the above changes.
