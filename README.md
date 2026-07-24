Enhance only the CheckIn.jsx page.

IMPORTANT:
- Do NOT modify backend APIs.
- Do NOT change routing.
- Do NOT change authentication.
- Keep the existing Check-In functionality working exactly as it is.
- Continue using:
  GET /api/Product
  GET /api/Rack/suggest/{quantity}
  POST /api/Inventory/checkin

After the user clicks "Find Rack", improve the UI by displaying rack utilization cards below the Suggested Rack dropdown.

Each suggested rack should be displayed as a Bootstrap card.

Each card must contain:

📦 Rack Code
Warehouse Name (if available)
Capacity
Occupied
Available Space
Status

Display a Bootstrap progress bar representing rack utilization.

Calculation:

Used Percentage = (Occupied / Capacity) × 100

Progress bar colors:

0–60% → bg-success (Green)

61–90% → bg-warning (Yellow)

91–100% → bg-danger (Red)

Example card:

---------------------------------------
📦 RACK-C3

Warehouse : Main Warehouse

Capacity : 100

Occupied : 34

Available : 66

Status : Available

████████░░░░░░░░ 34%
---------------------------------------

If multiple racks are returned by the API,
display all of them as responsive Bootstrap cards.

When the user selects a rack from the dropdown,
highlight the corresponding card with:

border-primary
shadow-lg

Only the selected rack card should be highlighted.

The dropdown must remain because it is used for submitting the selected RackId.

If no rack is available, show a Bootstrap warning alert:

"No suitable rack available for this quantity."

Keep the UI responsive for desktop and mobile.

Do not modify the backend.

Do not remove any existing functionality.

Only improve the frontend UI by adding the rack visualization cards.
