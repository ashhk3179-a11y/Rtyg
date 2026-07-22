dfhdh

uk
ghrf


using Microsoft.EntityFrameworkCore;
using wipmanagement.api.DTOs;
using wipmanagement.api.Interfaces.Services;
using wipmanagement.api.Models;
using wipmanagement.api.Data;

namespace wipmanagement.api.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly ApplicationDbContext _context;
        private readonly INotificationService _notificationService;

        public InventoryService(ApplicationDbContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        public async Task<WipInventoryDto> CheckInAsync(int productId, int rackId, int quantity, int employeeId)
        {
            if (quantity <= 0) throw new ArgumentException("Quantity must be positive", nameof(quantity));

            var wip = await _context.WipInventories.FirstOrDefaultAsync(w => w.ProductId == productId && w.RackId == rackId);
            if (wip == null)
            {
                wip = new WipInventory { ProductId = productId, RackId = rackId, Quantity = quantity, LastUpdated = DateTime.UtcNow };
                _context.WipInventories.Add(wip);
            }
            else
            {
                wip.Quantity += quantity;
                wip.LastUpdated = DateTime.UtcNow;
                _context.WipInventories.Update(wip);
            }

            var rack = await _context.Racks.FindAsync(rackId);
            if (rack == null) throw new InvalidOperationException("Rack not found");
            rack.Occupied += quantity;
            _context.Racks.Update(rack);

            var checkin = new CheckIn { WipInventory = wip, Quantity = quantity, Timestamp = DateTime.UtcNow, EmployeeId = employeeId };
            _context.CheckIns.Add(checkin);

            var audit = new AuditHistory { Action = "CheckIn", Timestamp = DateTime.UtcNow, EmployeeId = employeeId, Details = $"Checked in {quantity} for product {productId} to rack {rackId}" };
            _context.AuditHistories.Add(audit);

            await _context.SaveChangesAsync();

            // Create notification for Admin
            try
            {
                var product = await _context.Products.FindAsync(productId);
                var rackInfo = await _context.Racks.FindAsync(rackId);
                var employee = await _context.Employees.FindAsync(employeeId);

                var title = "CheckIn";
                var message = $"Employee {employee?.EmployeeCode} checked in {quantity} for Product {product?.ProductCode} to Rack {rackInfo?.RackCode}.";

                // Insert notification directly
                _context.Notifications.Add(new Notification
                {
                    Title = title,
                    Message = message,
                    RecipientRole = "Admin",
                    Status = "Unread",
                    Timestamp = DateTime.UtcNow
                });
                await _context.SaveChangesAsync();
            }
            catch
            {
                // Do not fail the main operation if notification fails
            }

            return new WipInventoryDto { WipInventoryId = wip.WipInventoryId, ProductId = wip.ProductId, RackId = wip.RackId, Quantity = wip.Quantity, LastUpdated = wip.LastUpdated };
        }

        public async Task<WipInventoryDto> CheckOutAsync(int wipInventoryId, int quantity, int employeeId)
        {
            if (quantity <= 0) throw new ArgumentException("Quantity must be positive", nameof(quantity));
            // Do not modify inventory here. Create a pending checkout request and notify admins.
            var wip = await _context.WipInventories.FindAsync(wipInventoryId);
            if (wip == null) throw new InvalidOperationException("Inventory not found");

            var checkout = new CheckOut { WipInventoryId = wipInventoryId, Quantity = quantity, Timestamp = DateTime.UtcNow, EmployeeId = employeeId, Status = "Pending" };
            _context.CheckOuts.Add(checkout);

            var audit = new AuditHistory { Action = "CheckOutRequested", Timestamp = DateTime.UtcNow, EmployeeId = employeeId, Details = $"Requested checkout of {quantity} from inventory {wipInventoryId}" };
            _context.AuditHistories.Add(audit);

            await _context.SaveChangesAsync();

            // Create notification for admins (no specific employee assigned)
            var employee = await _context.Employees.FindAsync(employeeId);
            var product = await _context.Products.FindAsync(wip.ProductId);
            var title = "Check-Out Request Pending";
            var message = $"Employee: {employee?.Name ?? "Unknown"}\nProduct: {product?.Name ?? "Unknown"}\nQuantity: {quantity}\nDate: {DateTime.UtcNow:u}\nStatus: Pending";
            var notifDto = new DTOs.NotificationCreateDto { EmployeeId = null, Title = title, Message = message };
            // Use notification service to persist notification
            await _notificationService.CreateAsync(notifDto);

            return new WipInventoryDto { WipInventoryId = wip.WipInventoryId, ProductId = wip.ProductId, RackId = wip.RackId, Quantity = wip.Quantity, LastUpdated = wip.LastUpdated };
        }

        public async Task<bool> ApproveCheckOutAsync(int checkOutId, int adminEmployeeId)
        {
            // Transactional approval: reduce inventory, update checkout status, audit, notify employee
            Microsoft.EntityFrameworkCore.Storage.IDbContextTransaction? tx = null;
            try
            {
                tx = await _context.Database.BeginTransactionAsync();
            }
            catch (InvalidOperationException)
            {
                // In-memory provider or others may not support transactions in tests; proceed without explicit transaction.
                tx = null;
            }

            var checkout = await _context.CheckOuts.FindAsync(checkOutId);
            if (checkout == null) return false;
            if (!string.Equals(checkout.Status, "Pending", StringComparison.OrdinalIgnoreCase)) return false;

            var wip = await _context.WipInventories.FindAsync(checkout.WipInventoryId);
            if (wip == null) return false;

            if (wip.Quantity < checkout.Quantity) return false; // cannot approve

            wip.Quantity -= checkout.Quantity;
            wip.LastUpdated = DateTime.UtcNow;
            _context.WipInventories.Update(wip);

            var rack = await _context.Racks.FindAsync(wip.RackId);
            if (rack == null) return false;
            rack.Occupied -= checkout.Quantity;
            if (rack.Occupied < 0) rack.Occupied = 0;
            _context.Racks.Update(rack);

            checkout.Status = "Approved";
            _context.CheckOuts.Update(checkout);

            var audit = new AuditHistory { Action = "CheckOutApproved", Timestamp = DateTime.UtcNow, EmployeeId = adminEmployeeId, Details = $"Approved checkout {checkout.CheckOutId} for inventory {checkout.WipInventoryId}, qty {checkout.Quantity}" };
            _context.AuditHistories.Add(audit);

            await _context.SaveChangesAsync();
            if (tx != null)
            {
                await tx.CommitAsync();
                await tx.DisposeAsync();
            }

            // Notify employee
            var employee = await _context.Employees.FindAsync(checkout.EmployeeId);
            var product = await _context.Products.FindAsync(wip.ProductId);
            var title = "Check-Out Request Approved";
            var message = $"Your check-out request for product: {product?.Name ?? "Unknown"} (Qty: {checkout.Quantity}) on {DateTime.UtcNow:u} has been Approved.";
            var notifDto = new DTOs.NotificationCreateDto { EmployeeId = checkout.EmployeeId, Title = title, Message = message };
            await _notificationService.CreateAsync(notifDto);

            return true;
        }

        public async Task<bool> RejectCheckOutAsync(int checkOutId, int adminEmployeeId)
        {
            var checkout = await _context.CheckOuts.FindAsync(checkOutId);
            if (checkout == null) return false;
            if (!string.Equals(checkout.Status, "Pending", StringComparison.OrdinalIgnoreCase)) return false;

            checkout.Status = "Rejected";
            _context.CheckOuts.Update(checkout);

            var audit = new AuditHistory { Action = "CheckOutRejected", Timestamp = DateTime.UtcNow, EmployeeId = adminEmployeeId, Details = $"Rejected checkout {checkout.CheckOutId} for inventory {checkout.WipInventoryId}, qty {checkout.Quantity}" };
            _context.AuditHistories.Add(audit);

            await _context.SaveChangesAsync();

            // Notify employee
            var employee = await _context.Employees.FindAsync(checkout.EmployeeId);
            var wip = await _context.WipInventories.FindAsync(checkout.WipInventoryId);
            var product = wip == null ? null : await _context.Products.FindAsync(wip.ProductId);
            var title = "Check-Out Request Rejected";
            var message = $"Your check-out request for product: {product?.Name ?? "Unknown"} (Qty: {checkout.Quantity}) on {DateTime.UtcNow:u} has been Rejected.";
            var notifDto = new DTOs.NotificationCreateDto { EmployeeId = checkout.EmployeeId, Title = title, Message = message };
            await _notificationService.CreateAsync(notifDto);

            return true;
        }

        public async Task<IEnumerable<WipInventoryDto>> GetAllAsync()
        {
            var list = await _context.WipInventories.Where(w => !w.IsDeleted).ToListAsync();
            return list.Select(w => new WipInventoryDto { WipInventoryId = w.WipInventoryId, ProductId = w.ProductId, RackId = w.RackId, Quantity = w.Quantity, LastUpdated = w.LastUpdated });
        }

        public async Task<WipInventoryDto> CreateInventoryAsync(int productId, int rackId, int quantity)
        {
            if (quantity < 0) throw new ArgumentException("Quantity cannot be negative", nameof(quantity));

            var product = await _context.Products.FindAsync(productId);
            if (product == null || product.IsDeleted) throw new InvalidOperationException("Product not found");

            var rack = await _context.Racks.FindAsync(rackId);
            if (rack == null || rack.IsDeleted) throw new InvalidOperationException("Rack not found");

            var wip = new WipInventory { ProductId = productId, RackId = rackId, Quantity = quantity, LastUpdated = DateTime.UtcNow };
            _context.WipInventories.Add(wip);

            rack.Occupied += quantity;
            _context.Racks.Update(rack);

            await _context.SaveChangesAsync();

            return new WipInventoryDto { WipInventoryId = wip.WipInventoryId, ProductId = wip.ProductId, RackId = wip.RackId, Quantity = wip.Quantity, LastUpdated = wip.LastUpdated };
        }

        public async Task<WipInventoryDto?> GetByIdAsync(int id)
        {
            var w = await _context.WipInventories.FindAsync(id);
            if (w == null || w.IsDeleted) return null;
            return new WipInventoryDto { WipInventoryId = w.WipInventoryId, ProductId = w.ProductId, RackId = w.RackId, Quantity = w.Quantity, LastUpdated = w.LastUpdated };
        }

        public async Task<WipInventoryDto> UpdateInventoryAsync(int id, int quantity)
        {
            if (quantity < 0) throw new ArgumentException("Quantity cannot be negative", nameof(quantity));
            var w = await _context.WipInventories.FindAsync(id);
            if (w == null || w.IsDeleted) throw new InvalidOperationException("Inventory not found");

            // adjust rack occupancy based on difference
            var rack = await _context.Racks.FindAsync(w.RackId);
            if (rack == null || rack.IsDeleted) throw new InvalidOperationException("Rack not found");

            var diff = quantity - w.Quantity;
            w.Quantity = quantity;
            w.LastUpdated = DateTime.UtcNow;
            _context.WipInventories.Update(w);

            rack.Occupied += diff;
            if (rack.Occupied < 0) rack.Occupied = 0;
            _context.Racks.Update(rack);

            await _context.SaveChangesAsync();

            return new WipInventoryDto { WipInventoryId = w.WipInventoryId, ProductId = w.ProductId, RackId = w.RackId, Quantity = w.Quantity, LastUpdated = w.LastUpdated };
        }

        public async Task<bool> SoftDeleteInventoryAsync(int id)
        {
            var w = await _context.WipInventories.FindAsync(id);
            if (w == null) return false;
            w.IsDeleted = true;
            _context.WipInventories.Update(w);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
