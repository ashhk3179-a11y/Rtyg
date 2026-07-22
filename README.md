The Inventory Create API is returning HTTP 400.

Do NOT modify Login, Products, Employees, Racks, Authentication, Dashboard or any other module.

Only fix the Inventory frontend.

Current backend DTO:

public class WipInventoryDto
{
    public int WipInventoryId { get; set; }
    public int ProductId { get; set; }
    public int RackId { get; set; }
    public int Quantity { get; set; }
    public DateTime LastUpdated { get; set; }
}

The backend is correct.

Fix the React Inventory page so that the POST request matches the DTO exactly.

Requirements:

1. When creating a new inventory record send:

{
  "wipInventoryId": 0,
  "productId": Number(selectedProductId),
  "rackId": Number(selectedRackId),
  "quantity": Number(quantity),
  "lastUpdated": new Date().toISOString()
}

2. Never send:
   - wipInventoryId: null
   - productId as string
   - rackId as string

3. Convert all numeric fields using Number().

4. Make sure axios.post sends the DTO object directly:

axios.post("/api/Inventory", dto)

Do NOT wrap it like:
{
   dto: dto
}

or

{
   inventory: dto
}

5. Log the payload before sending using:

console.log(dto);

6. After Save, refresh the Inventory table automatically.

7. Do not change backend code.
Do not modify any API endpoint.
Only fix the Inventory frontend request.
