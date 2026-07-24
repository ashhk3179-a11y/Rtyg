Fix only the Product dropdown in CheckIn.jsx.

Do not modify backend APIs.

The GET /api/Product response contains:

productId
productCode
name
category

The dropdown is incorrectly displaying category.

Update it to display:

productCode - name

Example:

PRD011 - motor
PRD012 - net
PRD013 - bolt

The option value must remain productId.

Do not display category.

Do not modify Find Rack, Check-In, or backend logic.

Modify only CheckIn.jsx.
