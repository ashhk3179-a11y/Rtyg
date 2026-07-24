Update only the Rack page (Racks.jsx) of my existing React frontend.

IMPORTANT:
- Do NOT modify any backend API URLs.
- Do NOT change authentication logic.
- Do NOT change routing or project structure.
- Keep the existing fetch request to:
  https://localhost:44321/api/Rack
- Continue using the JWT token from localStorage.

Required changes:

1. Remove all product-related columns:
- Product ID
- Product Name
- Category
- Quantity

2. Display only these columns:
- Rack ID
- Rack Code
- Warehouse Name
- Capacity
- Occupied
- Available
- Status

3. Update the search box so it searches only:
- Rack Code
- Warehouse Name
- Status

4. Display status using Bootstrap badges:
- Available → Green (bg-success)
- Almost Full → Yellow (bg-warning text-dark)
- Full → Red (bg-danger)

5. Keep loading spinner and error handling unchanged.

6. If there is no rack data, show:
"No Rack Data Available"

7. Make the table responsive using Bootstrap.

8. Do not change any backend logic.

9. Do not create new APIs.

10. Use the existing API response directly.

Expected response fields are:

rackId
rackCode
warehouseName
capacity
occupied
available
status

Only modify Racks.jsx.
Do not modify any other React component.
