Fix only the CheckOut.jsx page.

Do not change backend APIs, routes or authentication.

Problems to fix:

1. Inventory dropdown should display:
   ProductCode - ProductName (RackCode)

2. After selecting an inventory:
   - Product Name should display correctly.
   - Rack Code should display correctly.
   - Warehouse Name should display correctly.
   - Capacity should not show 0 if API contains rack capacity.
   - Occupied should calculate correctly.
   - Available Stock should show inventory quantity.
   - Status should display Available / Almost Full / Full.

3. Do not use multiple fallback fields.
   Read values only from the actual Inventory API response.

4. The Rack Information card should be arranged in two columns:

   Product
   Rack
   Warehouse
   Capacity
   Occupied
   Available
   Status

   with a Bootstrap progress bar below.

5. Remove large empty white spaces.

6. Remaining Stock should update live:

   Remaining = Available - Checkout Quantity

7. Destination should be a dropdown:

   Shop Floor
   Assembly
   Production
   Quality Check
   Dispatch

8. Disable Checkout button when:
   - No inventory selected
   - Quantity <= 0
   - Quantity > Available

9. Keep existing POST /api/Inventory/checkout request unchanged.

10. Do not change backend code.
Only improve frontend UI and correct data binding.
