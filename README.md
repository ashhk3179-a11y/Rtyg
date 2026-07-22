Do NOT modify Login, Authentication, Product, Employee, Dashboard, Inventory Create/Edit/Delete, or Notification modules.

Only fix the Check-Out API.

Problem:
Employee/Admin Check-Out returns HTTP 500 Server Error.

Requirements:
1. Find the root cause of the server error.
2. Fix only the Check-Out API.
3. Preserve the existing business logic.
4. Checkout must create a pending request for Employee.
5. Admin direct checkout should continue to work if already implemented.
6. Return proper HTTP status codes instead of Internal Server Error.
7. Do not modify any frontend files.
   .
   ..
pmt 2
Do NOT modify Login, JWT, Product, Employee, Inventory CRUD, or Checkout logic.

Only fix the Notification module.

Requirements:

1. When Employee performs Check-In:
   - Create Notification for Admin.
   - Show Employee Name.
   - Show Product.
   - Show Quantity.
   - Show Date & Time.

2. When Employee submits Checkout Request:
   - Notify Admin.

3. When Admin approves Checkout:
   - Notify Employee.

4. When Admin rejects Checkout:
   - Notify Employee.

5. Notifications must be saved in database.

6. Existing Notification APIs must remain unchanged.

7. Do not modify frontend.

pmt 3

Do NOT modify Inventory, Product, Dashboard, Login, Notification, Employee.

Only fix WIP module.

Problem:
WIP page shows:

Loading production data
Server returned 404

Requirements:

1. Find which API returns 404.
2. Fix only the missing API or incorrect route.
3. Do not change frontend URLs.
4. Existing WIP functionality must continue working.
5. Return valid production data.

pmt 4
Do NOT modify Login, Dashboard, Product, Inventory, WIP.

Only fix Notification page.

Requirements:

1. Admin must see Admin notifications.

2. Employee must see only Employee notifications.

3. Auto refresh notifications.

4. Mark as Read.

5. Unread badge.

6. Preserve existing APIs.

7. Do not modify backend.
