/*
REVIEWED VERSION

Apply these improvements:
- Keep backend APIs unchanged.
- Show rack card only after inventory selection.
- Move Remaining Stock inside rack card.
- Replace Destination textbox with dropdown.
- Show validation only after typing.
- Highlight selected rack.
- Auto refresh after checkout.
- Keep success alert briefly then clear.
*/

import "./CheckOut.css";
import { useState, useEffect } from "react";
// axios not used; using fetch for API calls

function CheckOut() {
    const [inventories, setInventories] = useState([]);
    const [loadingInventories, setLoadingInventories] = useState(true);
    // single searchable dropdown (native select) - no separate search textbox
    const [selectedInventoryId, setSelectedInventoryId] = useState("");
    const [selectedInventory, setSelectedInventory] = useState(null);
    const [checkoutQuantity, setCheckoutQuantity] = useState("");
    const [destination, setDestination] = useState("Shop Floor");
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [submitting, setSubmitting] = useState(false);

    const fetchInventories = async () => {
        setLoadingInventories(true);
        try {
            const res = await fetch("https://localhost:44321/api/Inventory", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            if (!res.ok) throw new Error(`Server responded ${res.status}`);
            const data = await res.json();
            const list = Array.isArray(data) ? data : [];
            setInventories(list);
            // if an item is already selected, refresh the selectedInventory reference
            if (selectedInventoryId) {
                const ref = list.find((i) => String(i.wipInventoryId || i.inventoryId || i.id) === String(selectedInventoryId));
                setSelectedInventory(ref || null);
            }
            // notify other parts of the app that inventory has been refreshed
            try {
                window.dispatchEvent(new Event('inventory.updated'));
            } catch {
                // ignore in environments without window
            }
        } catch (err) {
            console.error(err);
            setAlert({ type: "danger", message: "Failed to load inventory." });
        } finally {
            setLoadingInventories(false);
        }
    };

    useEffect(() => {
        const init = async () => {
            await fetchInventories();
        };
        init();
    }, []);

    // use selectedInventory state for stable reference
    const selected = selectedInventory;

    // make lookups robust to different API shapes
    const productName = selected?.product?.name ?? selected?.name ?? selected?.productName ?? selected?.productName ?? "";
    const rackCode = selected?.rack?.rackCode ?? selected?.rackCode ?? selected?.rackName ?? selected?.location?.rackCode ?? "";
    const warehouseName = selected?.rack?.warehouseName ?? selected?.warehouseName ?? selected?.warehouse ?? selected?.rack?.location ?? "";
    const status = selected?.rack?.status ?? selected?.status ?? selected?.rackStatus ?? "";

    const available = Number(
        selected?.available ?? selected?.availableQuantity ?? selected?.quantity ?? selected?.currentQuantity ?? selected?.currentStock ?? selected?.stock ?? 0
    );
    const capacity = Number(
        selected?.capacity ?? selected?.rackCapacity ?? selected?.rack?.capacity ?? selected?.maxCapacity ?? selected?.rack?.maxCapacity ?? 0
    );
    const occupied = Number(
        selected?.occupied ?? selected?.rackOccupied ?? selected?.rack?.occupied ?? selected?.used ?? selected?.rack?.used ?? 0
    );

    const remainingAfter = (() => {
        const q = Number(checkoutQuantity) || 0;
        return available - q;
    })();

    const exceeds = Number(checkoutQuantity || 0) > available;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert({ type: "", message: "" });
        if (!selectedInventoryId) {
            setAlert({ type: "danger", message: "Select an inventory item." });
            return;
        }
        if (!checkoutQuantity || Number(checkoutQuantity) <= 0) {
            setAlert({ type: "danger", message: "Enter a valid checkout quantity." });
            return;
        }
        if (exceeds) {
            setAlert({ type: "danger", message: "Checkout quantity exceeds available stock." });
            return;
        }
        const employeeId = localStorage.getItem("employeeId");
        if (!employeeId) {
            setAlert({ type: "danger", message: "Employee not identified. Please login." });
            return;
        }

        const body = {
            wipInventoryId: selectedInventoryId,
            quantity: Number(checkoutQuantity),
            employeeId: employeeId,
        };

        try {
            setSubmitting(true);
            const res = await fetch("https://localhost:44321/api/Inventory/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(body),
            });
            if (res.ok) {
                setAlert({ type: "success", message: "Checkout Request Submitted Successfully." });
                // reset form
                setSelectedInventoryId("");
                setCheckoutQuantity("");
                setDestination("Shop Floor");
                // refresh inventory
                await fetchInventories();
                // notify dashboard/notifications immediately
                try {
                    window.dispatchEvent(new Event('notifications.updated'));
                    window.dispatchEvent(new Event('inventory.updated'));
                } catch {
                    // ignore
                }
            } else {
                const text = await res.text();
                setAlert({ type: "danger", message: `Checkout Failed: ${text || res.status}` });
            }
        } catch (err) {
            console.error(err);
            setAlert({ type: "danger", message: "Server Error" });
        } finally {
            setSubmitting(false);
        }
    };

    // compute utilization for rack visualization
    const usedPercent = (() => {
        if (!capacity || capacity === 0) return 0;
        let pct = Math.round((occupied / capacity) * 100);
        if (pct < 0) pct = 0;
        if (pct > 100) pct = 100;
        return pct;
    })();

    let barClass = "bg-success";
    if (usedPercent >= 61 && usedPercent <= 90) barClass = "bg-warning";
    if (usedPercent >= 91) barClass = "bg-danger";

    // no client-side search textbox; native select allows quick keyboard selection

    return (
        <div className="container-fluid p-4">
            <h2 className="mb-4">Check-Out Product</h2>

            <div className="card shadow">
                <div className="card-body">
                    {alert.message && (
                        <div className={`alert alert-${alert.type}`} role="alert">
                            {alert.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <label className="form-label">Select Inventory</label>
                                <select
                                    className="form-select"
                                    value={selectedInventoryId}
                                    onChange={(e) => {
                                        const id = e.target.value;
                                        setSelectedInventoryId(id);
                                        const found = inventories.find((it) => String(it.wipInventoryId || it.inventoryId || it.id) === String(id));
                                        setSelectedInventory(found || null);
                                    }}
                                >
                                    <option value="">{loadingInventories ? "Loading inventory..." : "Select Inventory"}</option>
                                    {inventories.map((it) => (
                                        <option key={it.wipInventoryId || it.inventoryId || it.id} value={it.wipInventoryId || it.inventoryId || it.id}>
                                            {`${it.productCode || it.product?.productCode || ""} - ${it.name || it.productName || it.product?.name || ""} (${it.rackCode || it.rack?.rackCode || ""})`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Rack Info Card */}
                            {selectedInventoryId && (
                                <div className="col-12 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">📦 {rackCode}</h5>
                                            <p className="card-text"><strong>Product :</strong> {productName}</p>
                                            {warehouseName && <p className="card-text"><strong>Warehouse :</strong> {warehouseName}</p>}
                                            <p className="card-text"><strong>Current Stock :</strong> {available}</p>
                                            <p className="card-text"><strong>Capacity :</strong> {capacity}</p>
                                            <p className="card-text"><strong>Occupied :</strong> {occupied}</p>
                                            <p className="card-text"><strong>Available :</strong> {available}</p>
                                            <p className="card-text"><strong>Status :</strong> <span className={`badge ${status === "Available" ? "bg-success" : status === "Almost Full" ? "bg-warning text-dark" : status === "Full" ? "bg-danger" : "bg-secondary"}`}>{status}</span></p>

                                            <div className="progress mt-2" style={{ height: "22px" }}>
                                                <div
                                                    className={`progress-bar ${barClass} progress-bar-striped progress-bar-animated`}
                                                    role="progressbar"
                                                    style={{ width: `${usedPercent}%` }}
                                                    aria-valuenow={usedPercent}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                >
                                                    {usedPercent}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Checkout inputs */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Checkout Quantity</label>
                                <input
                                    type="number"
                                    className="form-control form-control-lg"
                                    value={checkoutQuantity}
                                    onChange={(e) => setCheckoutQuantity(e.target.value)}
                                    min="1"
                                    placeholder="Enter quantity to checkout"
                                />
                            </div>

                            <div className="col-md-6 mb-3 d-flex align-items-end">
                                <div className="w-100">
                                    <label className="form-label">Destination</label>
                                    <input className="form-control form-control-lg" value={destination} onChange={(e) => setDestination(e.target.value)} />
                                </div>
                            </div>

                            <div className="col-12 mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>Remaining Stock: </strong> {isNaN(remainingAfter) ? "-" : remainingAfter}
                                    </div>
                                    <div>
                                        {(!checkoutQuantity || Number(checkoutQuantity) <= 0) && (
                                            <div className="alert alert-danger mb-0">Enter a checkout quantity greater than 0.</div>
                                        )}
                                        {exceeds && (
                                            <div className="alert alert-danger mb-0">Checkout quantity exceeds available stock.</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mb-3">
                                <button type="submit" className="btn btn-danger btn-lg w-100" disabled={!selectedInventoryId || !checkoutQuantity || Number(checkoutQuantity) <= 0 || exceeds || submitting}>
                                    {submitting ? "Submitting..." : "CHECK OUT REQUEST"}
                                </button>
                            </div>
                        </div>
                    </form>
                    {/* Rack visualization removed - rack info shown above */}
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
