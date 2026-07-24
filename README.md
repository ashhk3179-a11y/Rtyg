Fix the entire Check-Out module.

Do NOT modify authentication or routing.

Use only existing backend APIs.

Requirements:

1. Inventory dropdown must load correctly using GET /api/Inventory.

2. Selecting an inventory item must display a Bootstrap Rack Card showing:
- Product Name
- Rack Code
- Warehouse Name
- Current Stock
- Capacity
- Occupied Space
- Available Space
- Rack Status
- Progress Bar

3. Remove unnecessary readonly textboxes.

4. User should only enter:
- Checkout Quantity
- Destination

5. Show Remaining Stock live while typing.

6. Validate quantity:
- Must be greater than zero.
- Must not exceed current stock.
- Show Bootstrap danger alert if invalid.
- Disable Checkout button when invalid.

7. Submit using existing POST /api/Inventory/checkout API.

8. On success:
- Show Bootstrap success alert.
- Refresh inventory.
- Refresh rack card.
- Clear form.

9. Ensure Inventory, Rack utilization, Dashboard and Notifications reflect the checkout immediately.

10. Keep the UI clean, responsive and visually consistent with the Check-In page.

Modify only CheckOut.jsx unless a small frontend helper change is absolutely necessary. Do not change backend business logic or API contracts.
