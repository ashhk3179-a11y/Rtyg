Update only the CheckIn.jsx page.

Do not modify backend APIs or routing.

Implement the following workflow:

1. Load all products using:
GET /api/Product

2. Display Product as a dropdown.

3. User enters Quantity.

4. Add a "Find Rack" button.

5. When clicked, call:
GET /api/Rack/suggest/{quantity}

using JWT token from localStorage.

6. Display returned racks in a dropdown.

7. User selects one rack.

8. Read employeeId from localStorage.

9. On Check-In button click call:

POST /api/Inventory/checkin

Body:

{
  productId,
  rackId,
  quantity,
  employeeId
}

10. Show success and error alerts.

11. Disable Check-In button until a rack is selected.

12. Use Bootstrap styling.

13. Keep authentication and existing project structure unchanged.

Modify only CheckIn.jsx.
