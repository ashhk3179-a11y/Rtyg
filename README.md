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
