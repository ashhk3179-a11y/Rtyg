Do NOT modify Login, Authentication, Product, Dashboard, Employee, Notification, or any working functionality.

Only fix Inventory Check-In and Check-Out integration.

Current backend API:

POST /api/Inventory/checkin
expects query parameters:
productId
rackId
quantity
employeeId

POST /api/Inventory/checkout
expects query parameters:
wipInventoryId
quantity
employeeId

Frontend Inventory.jsx is currently sending JSON body.
This is incorrect.

Requirements:

1. Change axios.post() for Check-In to send query parameters instead of JSON.

Use:

productId = selected inventory.productId
rackId = selected inventory.rackId
quantity = entered quantity
employeeId = getCurrentUser().id

2. Change axios.post() for Check-Out to send:

wipInventoryId
quantity
employeeId

as query parameters.

3. Do NOT change backend controller.

4. Do NOT change InventoryService.

5. Do NOT change Login.

6. Use getCurrentUser().id from auth.js.

7. Preserve Authorization Bearer Token.

8. Preserve all existing UI.

Only fix API integration.
