The WIP Management Frontend is already working.

IMPORTANT - DO NOT BREAK ANY EXISTING FUNCTIONALITY

1. Do NOT modify any existing backend APIs.
2. Do NOT modify database schema.
3. Do NOT modify Login API.
4. Do NOT modify JWT Authentication.
5. Do NOT modify Product CRUD.
6. Do NOT modify Inventory CRUD.
7. Do NOT modify Import Excel.
8. Do NOT modify Download Template.
9. Do NOT modify Warehouse, Rack, Employee, Prediction backend.
10. Do NOT rename routes, components or API endpoints.
11. Do NOT remove any existing working functionality.
12. Only fix the issues below while maintaining backward compatibility.

==================================================
OBJECTIVE 1
FIX LOGGED-IN USER DETAILS
==================================================

Currently every logged-in user is displayed as "Admin".

This is incorrect.

Read the logged-in user's information from the existing JWT Token or Login API response.

Display:

Admin Login
→ Admin

Supervisor Login
→ Supervisor

Employee Login
→ Employee

Also display the logged-in Employee Name if available.

Do NOT hardcode any values.

==================================================
OBJECTIVE 2
ROLE BASED SIDEBAR
==================================================

Show menu items based on logged-in user's role.

ADMIN

Show

Dashboard
Products
Employees
WIP
Inventory
Check-In
Check-Out
Racks
Reports
Notifications
Prediction

SUPERVISOR

Show only

Dashboard
Products
Inventory
Check-In
Check-Out
Racks
Notifications

Hide

Employees
Reports
Prediction
Any Admin-only module

EMPLOYEE

Show only

Dashboard
Products
Inventory
Check-In
Check-Out
Notifications

Hide

Employees
Reports
Prediction
Rack Management
WIP Management
Admin Settings

Do not simply disable menu items.

Completely hide unauthorized menus.

==================================================
OBJECTIVE 3
ROLE BASED DASHBOARD
==================================================

Dashboard cards must also change according to role.

ADMIN

Display all dashboard cards.

SUPERVISOR

Hide

Employee Count
Prediction
Admin Statistics
Reports related cards

EMPLOYEE

Display only

Today's Check-In
Today's Check-Out
Current Inventory
Own Pending Requests
Own Approved Requests
Own Notifications

Hide every Admin dashboard card.

==================================================
OBJECTIVE 4
PROTECT FRONTEND ROUTES
==================================================

Users should not access unauthorized pages by manually typing URLs.

If Employee opens

/employees
/reports
/predictions
/racks-management

Redirect to

Unauthorized Page

or

Dashboard

Do not allow unauthorized page rendering.

==================================================
OBJECTIVE 5
FIX DASHBOARD REDIRECTION
==================================================

Currently clicking Dashboard redirects to Login.

Fix this.

Dashboard should always navigate correctly after successful login.

Do not clear JWT token unnecessarily.

Maintain logged-in session until Logout.

==================================================
OBJECTIVE 6
FIX RACK PAGE
==================================================

Currently clicking Racks displays a blank page.

Fix this.

Requirements

Show loading spinner.

If data exists

Display Rack Table.

If no data

Display

"No Rack Data Available"

If API fails

Display proper Bootstrap error alert.

Never render a blank screen.

==================================================
OBJECTIVE 7
FIX PRODUCTION PAGE
==================================================

Currently Production page is blank.

Apply the same behavior as Rack.

Loading

Empty State

Error State

Data Table

Never display blank page.

==================================================
OBJECTIVE 8
NOTIFICATION MODULE
==================================================

Reuse existing Notification APIs.

Do NOT create new APIs.

Admin

View all notifications.

Unread notification badge.

Mark notification as Read.

Notification history.

Employee

View only own notifications.

View Check-Out Request Status.

Supervisor

View notifications related to assigned work.

Notification badge should update automatically after refresh.

==================================================
OBJECTIVE 9
BETTER NAVBAR
==================================================

Top Right should display

Notification Bell

Unread Count

Logged-in Employee Name

Role Badge

Profile Dropdown

Logout

Example

🔔 3

Sriram

Employee

▼

Logout

==================================================
OBJECTIVE 10
BETTER USER EXPERIENCE
==================================================

Show loading spinner during API calls.

Show Bootstrap Alerts for API errors.

Show Toast Messages

Login Successful

Request Submitted

Notification Read

Profile Updated

Request Approved

Request Rejected

Do not leave blank screens.

==================================================
OBJECTIVE 11
PRESERVE EVERYTHING
==================================================

Do NOT modify

Backend APIs

Controllers

Models

DTOs

Entity Framework

JWT Authentication

Database

Existing CRUD

Working Dashboard Cards

Working Login

Working Product Module

Working Inventory Module

Working Import Excel

Working Download Template

Notification Backend

Only improve frontend.

==================================================
FINAL GOAL
==================================================

The application should behave like a real Manufacturing WIP Management System.

Each role should see only the modules they are authorized to access.

Unauthorized pages must never be accessible.

Dashboard should never redirect to Login unexpectedly.

Racks and Production pages must never show blank screens.

Notifications should work using the existing backend APIs.

The UI must remain responsive, modern, professional, and fully compatible with the existing backend without breaking any current functionality.
