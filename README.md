Update ONLY CheckOut.jsx.

Do NOT modify:
- Backend APIs
- Controllers
- Services
- DTOs
- Database
- Authentication
- Routing
- Other React pages

Use only the existing backend APIs.

=========================================
OBJECTIVE
=========================================

Redesign the entire Check-Out page to match the professional UI used in the Check-In page.

The page must be simple, clean, responsive and industrial looking.

=========================================
REMOVE THESE COMPLETELY
=========================================

Remove these UI elements:

- Search Inventory textbox
- Product Name textbox
- Rack Code textbox
- Warehouse Name textbox
- Available Quantity textbox

Do NOT show these as readonly input fields.

=========================================
STEP 1
=========================================

At the top show only one searchable dropdown.

Title:

Select Inventory

Dropdown should load data from

GET /api/Inventory

Display items like:

PRD001 - Motor (Rack-A1)

PRD002 - Pump (Rack-B2)

PRD003 - Sensor (Rack-C1)

No separate search textbox.

=========================================
STEP 2
=========================================

After selecting an inventory item,

display a Bootstrap Rack Information Card.

Do NOT use textboxes.

The card should show:

📦 Rack Code

Product Name

Warehouse Name

Current Stock

Rack Capacity

Occupied Space

Available Space

Rack Status

Bootstrap Progress Bar showing rack utilization

Example:

------------------------------------------------

📦 RACK-A1

Product : Motor

Warehouse : Warehouse-1

Current Stock : 80

Capacity : 100

Occupied : 80

Available : 20

Status : Almost Full

████████░░ 80%

------------------------------------------------

Use colors:

Available → Green

Almost Full → Orange

Full → Red

=========================================
STEP 3
=========================================

Below the rack card display

Checkout Quantity

[input]

As the user types,

calculate instantly

Remaining Stock

Example:

Current Stock : 80

Checkout : 12

Show

Remaining Stock

68

Do NOT wait for submit.

=========================================
STEP 4
=========================================

Destination

[input]

Default value

Shop Floor

=========================================
STEP 5
=========================================

Large Bootstrap button

CHECK OUT REQUEST

=========================================
VALIDATION
=========================================

If

Checkout Quantity <= 0

Show Bootstrap danger alert.

If

Checkout Quantity > Current Stock

Show Bootstrap danger alert

"Checkout quantity exceeds available stock."

Disable Checkout button.

Do NOT send API request.

=========================================
SUBMIT
=========================================

Use existing API only.

POST

/api/Inventory/checkout

Send exactly

{
    "wipInventoryId": selectedInventoryId,
    "quantity": checkoutQuantity,
    "employeeId": employeeId
}

Do NOT change backend.

=========================================
SUCCESS
=========================================

Show Bootstrap success alert

"Checkout Request Submitted Successfully."

Then

Refresh inventory

Refresh rack details

Clear quantity

Reset destination to

Shop Floor

Keep dropdown empty

=========================================
ERROR
=========================================

Display backend error message inside Bootstrap danger alert.

=========================================
LAYOUT
=========================================

Use Bootstrap cards.

Use responsive grid.

Desktop:

Top
Dropdown

Middle
Rack Card

Bottom

Checkout Quantity

Remaining Stock

Destination

Button

Everything should align properly.

Spacing should match Check-In page.

=========================================
EXTRA IMPROVEMENTS
=========================================

Add icons where appropriate.

Animate Bootstrap progress bar.

Highlight selected rack.

Show rack utilization percentage.

Everything should look like a professional manufacturing WIP Management application.

=========================================
IMPORTANT
=========================================

Modify ONLY CheckOut.jsx.

Do NOT modify backend.

Do NOT change APIs.

Do NOT change authentication.

Do NOT change routing.

Keep existing functionality working.

Only redesign the UI and improve the user experience.
