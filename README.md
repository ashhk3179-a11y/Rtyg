The Inventory page is currently loading only Products but not Racks.

Do NOT modify Login.
Do NOT modify Authentication.
Do NOT modify Product.
Do NOT modify Inventory CRUD.
Do NOT modify Backend APIs.

Only fix the Inventory Add/Edit form.

Requirements:

1. On Inventory page load, call:
   GET /api/Product
   GET /api/Rack

2. Both API calls must include the existing JWT Bearer token.

3. Store products and racks in separate React state variables.

4. The Product dropdown must display ProductCode or Product Name.

5. The Rack dropdown must display RackCode.

6. The selected value must be RackId.

7. If no racks exist, show "No racks available".

8. Refresh the rack list after creating a new rack.

9. Do not hardcode rack values.

10. Do not change backend, routes, DTOs, models or controllers.

11. Verify in the browser Network tab that GET /api/Rack is called successfully before rendering the Inventory form.
