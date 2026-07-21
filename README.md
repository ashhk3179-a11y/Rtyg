Continue developing my existing WIP Management Monitor project without changing the backend APIs.

Tech Stack:
- Frontend: React + Vite + Bootstrap + Axios
- Backend: ASP.NET Core Web API
- Database: SQL Server
- JWT Authentication already implemented.

Current Status:
- Login is working.
- Product API (GET, POST, PUT, DELETE) is already working.
- Product list is displayed.
- I do NOT want inline product entry fields anymore.

I want the Product module to work like a real Manufacturing ERP system.

Requirements:

1. Remove all product input fields from the top of the Products page.

2. Keep only these controls:
   - Search Box
   - Add Product button
   - Import Excel button

3. When the user clicks "Add Product", open a Bootstrap Modal.

4. The Add Product modal must contain these fields:
   - Product Code
   - Product Name
   - Description
   - Category
   - Quantity
   - Status (Dropdown)
       • Active
       • Pending
       • In Progress
       • Completed
   - QR Code

5. Buttons inside the modal:
   - Cancel
   - Add Product

6. When the user clicks Add Product:
   - Validate all required fields.
   - Call the existing POST Product API.
   - Save the data to SQL Server.
   - Close the modal.
   - Refresh the product list automatically.
   - Update dashboard cards.
   - Show a success notification.
   - Do not refresh the page.

7. The product table must display:
   - Product Code
   - Product Name
   - Description
   - Category
   - Quantity
   - Status
   - QR Code
   - Edit
   - Delete

8. Clicking Edit should:
   - Open the same modal.
   - Load the selected product.
   - Allow editing all fields.
   - Save using the existing PUT API.
   - Refresh the table automatically.

9. Clicking Delete should:
   - Show a confirmation dialog.
   - Call the existing DELETE API.
   - Refresh the table automatically.

10. Excel Import:
    - Clicking "Import Excel" should open a file picker.
    - Accept only .xlsx and .xls files.
    - Read the Excel file using the xlsx library.
    - Preview all rows before uploading.
    - On confirmation, upload each row using the existing POST Product API.
    - Refresh the product table after import.
    - Show a success message.

11. Validation:
    - Product Code is required.
    - Product Name is required.
    - Category is required.
    - Quantity must be greater than or equal to zero.
    - Status is required.
    - Prevent duplicate Product Codes.

12. UI Requirements:
    - Professional Manufacturing ERP design.
    - Responsive Bootstrap layout.
    - Blue theme matching the dashboard.
    - Proper spacing and alignment.
    - Loading spinner while saving or importing.
    - Disable buttons while API requests are running.

Important:
- Do not change the backend.
- Use the existing Product APIs.
- Keep the code clean and reusable.
- Ensure all product data entered manually or imported from Excel is stored in SQL Server and immediately displayed in the Product table.

Continue developing ONLY the WIP Inventory module.

IMPORTANT RULES (DO NOT BREAK):

1. Do NOT modify any existing working code.
2. Do NOT modify Login.
3. Do NOT modify Authentication or JWT logic.
4. Do NOT modify Products module.
5. Do NOT modify Dashboard.
6. Do NOT modify Sidebar or Navbar unless a new "Inventory" menu item is required.
7. Do NOT modify backend code, SQL Server, Entity Framework models, Controllers, Repositories, DTOs, or APIs.
8. Use only the existing Inventory APIs.
9. Do NOT rename files, routes, components, or API endpoints that are already working.
10. Preserve the current project structure.

Build ONLY the React frontend for the Inventory module.

Use these existing APIs:

GET    /api/Inventory
GET    /api/Inventory/{id}
POST   /api/Inventory
PUT    /api/Inventory/{id}
DELETE /api/Inventory/{id}
POST   /api/Inventory/checkin
POST   /api/Inventory/checkout

Inventory Entity:

- WipInventoryId
- ProductId
- RackId
- Quantity
- LastUpdated
- IsDeleted

Requirements:

1. Create an Inventory page using the existing dashboard theme.

2. Display dashboard cards:
- Total Inventory Items
- Total Quantity
- Total Check-Ins
- Total Check-Outs

3. Add a toolbar containing:
- Search
- Refresh
- Add Inventory button

4. Display an Inventory table with:
- Inventory ID
- Product
- Rack
- Quantity
- Last Updated
- Actions

5. Actions:
- Edit
- Delete
- Check-In
- Check-Out

6. Add Inventory Modal:
- Product dropdown
- Rack dropdown
- Quantity
- Save
- Cancel

7. Edit Inventory:
- Load existing data
- Update using PUT API

8. Delete Inventory:
- Confirmation dialog
- Delete using DELETE API

9. Check-In:
- Open modal
- Enter quantity
- Call POST /api/Inventory/checkin
- Refresh table automatically

10. Check-Out:
- Open modal
- Enter quantity
- Call POST /api/Inventory/checkout
- Refresh table automatically

11. Use:
- React Hooks
- Axios
- Bootstrap
- Loading spinner
- Toast notifications
- Proper validation
- Error handling

12. All CRUD operations must work without page refresh.

Final Rule:
Do not modify or break any existing functionality. Only add the Inventory module and integrate it with the existing backend APIs.
