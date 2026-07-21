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
Continue developing my WIP Management Monitor project.

Tech Stack:
- React + Vite + Bootstrap
- ASP.NET Core Web API
- SQL Server
- Entity Framework Core
- JWT Authentication

The Product module is complete and fully integrated with the backend.

Now implement the WIP Inventory module.

Requirements:

1. Create a new page named "WIP Inventory".

2. Display dashboard cards:
   - Total WIP Items
   - In Progress
   - Completed
   - On Hold

3. Add a searchable and filterable table with these columns:
   - WIP ID
   - Product Code
   - Product Name
   - Warehouse
   - Location
   - Quantity
   - Current Stage
   - Assigned Employee
   - Last Updated
   - Status
   - Actions

4. Add an "Add WIP Item" button that opens a Bootstrap modal.

5. The Add WIP modal should contain:
   - Product (dropdown populated from Products API)
   - Warehouse
   - Storage Location
   - Quantity
   - Current Stage
   - Assigned Employee
   - Status (In Progress, Completed, On Hold)
   - Remarks

6. On Save:
   - Validate all required fields.
   - Call the existing backend API (or prepare the frontend to consume the upcoming API if it does not yet exist).
   - Refresh the WIP Inventory table without reloading the page.
   - Show a success notification.

7. Implement Edit and Delete functionality using modals and confirmation dialogs.

8. Add search by:
   - Product Code
   - Product Name
   - Warehouse
   - Status

9. Add filters:
   - Warehouse
   - Current Stage
   - Status

10. Add pagination and sorting.

11. Use responsive Bootstrap cards and tables with a professional manufacturing ERP design.

12. Use Axios, React Hooks, reusable components, loading indicators, proper error handling, and clean code.

Do not modify the authentication or Product module. Build the WIP Inventory module so it integrates seamlessly with the existing project and follows the same UI/UX style.


Continue developing the WIP Inventory module using my existing backend APIs.

Backend is already completed.

Available Inventory APIs:

POST /api/Inventory
GET /api/Inventory
GET /api/Inventory/{id}
PUT /api/Inventory/{id}
DELETE /api/Inventory/{id}
POST /api/Inventory/checkin
POST /api/Inventory/checkout

Current Inventory model contains:

- WipInventoryId
- ProductId
- RackId
- Quantity
- LastUpdated
- IsDeleted

Product and Rack are foreign key relationships.

Requirements:

1. Create a professional WIP Inventory page.

2. At the top display dashboard cards:
- Total Inventory
- Total Quantity
- Total Check-ins
- Total Check-outs

3. Top toolbar should contain:
- Search box
- Product filter
- Rack filter
- Refresh button
- Add Inventory button

4. Clicking "Add Inventory" opens a Bootstrap modal.

Modal fields:
- Product (dropdown populated from Product API)
- Rack (dropdown populated from Rack API)
- Quantity

LastUpdated should not be entered manually. It should be automatically handled by the backend.

5. Save should call POST /api/Inventory.

6. Inventory table columns:

- Inventory ID
- Product Code
- Product Name
- Rack Name
- Quantity
- Last Updated
- Actions

7. Actions:
- Edit
- Delete
- Check In
- Check Out

8. Edit should use PUT /api/Inventory/{id}.

9. Delete should use DELETE /api/Inventory/{id} after confirmation.

10. Check In:
Open a modal asking for quantity.
Call POST /api/Inventory/checkin.
Refresh the table automatically.

11. Check Out:
Open a modal asking for quantity.
Call POST /api/Inventory/checkout.
Refresh the table automatically.

12. Implement:
- Search
- Pagination
- Sorting
- Loading spinner
- Toast notifications
- Error handling

13. Use Axios and React Hooks.

14. Keep the same dashboard theme as the Product module.

15. Do not modify backend APIs or database schema.
