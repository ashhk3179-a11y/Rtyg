IMPORTANT: READ CAREFULLY.

This project is already working.

DO NOT redesign anything.
DO NOT create new pages.
DO NOT create Unauthorized UI.
DO NOT modify routing.
DO NOT modify login page.
DO NOT change existing layouts.
DO NOT change any colors.
DO NOT change CSS.
DO NOT touch any feature except Sidebar Permission.

ONLY FIX THIS BUG.

Current behaviour:

Earlier the sidebar was working correctly.

After recent permission changes the sidebar now shows
"No menu items available"

or does not reflect updated employee permissions.

Expected behaviour:

Admin opens Employees.

Admin clicks Edit Access.

Admin selects modules like:

Dashboard
Inventory
Check-In
Check-Out
Notifications
Reports
Prediction
Products
Employees
WIP
Racks

Clicks Save.

Backend already saves successfully.

Employee logs out.

Employee logs in again.

Sidebar MUST automatically display ONLY the modules selected by Admin.

If Admin removes Inventory,
Inventory must disappear.

If Admin enables Reports,
Reports must appear.

Sidebar must behave exactly like before.

DO NOT hardcode menu items.

Read latest Access from Login Response or AuthContext/localStorage.

Refresh sidebar after every new login.

Do NOT modify any unrelated files.

At the end provide:

1. Modified files
2. Reason for each modification
3. Testing steps

........

IMPORTANT: DO NOT REDESIGN ANYTHING.

DO NOT change APIs.

DO NOT change routing.

DO NOT create new endpoints.

DO NOT change Unauthorized.

DO NOT modify Login UI.

ONLY FIX EMPLOYEE ACCESS.

Current behaviour:

Access Update API returns success.

Database saves Access.

But next login still returns old/empty permissions.

Expected behaviour:

Whenever employee logs in,

Backend MUST always return the latest Employee.Access value stored in SQL Server.

JWT must contain latest Access.

LoginResponse must contain latest Access.

No caching.

No hardcoded permission values.

Do not change database schema.

Do not modify existing API routes.

Only fix the permission loading bug.

Finally provide:

1. Modified files
2. Why they were modified
3. How to test
