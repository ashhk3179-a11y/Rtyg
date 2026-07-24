Update only CheckOut.jsx.

Do not modify backend APIs.

Keep authentication and routing unchanged.

Use only existing APIs.

Workflow:

1. Load inventory using:
GET /api/Inventory

2. Display inventory as a searchable dropdown.

3. After selecting an inventory item automatically display:
- Product Name
- Rack Code
- Warehouse Name
- Available Quantity

4. Remove manual entry for:
- Product Name
- Category
- Rack
- Available Quantity

These must be read-only and auto-filled.

5. User should only enter:
- Checkout Quantity
- Destination

6. Add a Rack Visualization section similar to the Check-In page.

Requirements:
- Display the selected rack as a Bootstrap card.
- Show:
  - Rack Code
  - Warehouse Name
  - Capacity
  - Occupied Space
  - Available Space
  - Current Product Quantity
  - Status (Available / Almost Full / Full)
- Display a Bootstrap progress bar showing rack utilization.
- Highlight the selected rack.
- Show a live preview:
  "Remaining Quantity After Checkout: XX"
- If checkout quantity exceeds available stock, show a Bootstrap danger alert and disable Submit.

7. Submit using the existing:
POST /api/Inventory/checkout

Send:
{
    wipInventoryId,
    quantity,
    employeeId
}

8. On success show:
"Checkout Request Submitted Successfully"

9. Reset the form and refresh inventory and rack information automatically.

10. Use Bootstrap cards, responsive layout, and keep the UI consistent with the Check-In page.

Do not change backend.

Modify only CheckOut.jsx.
