import { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../utils/auth";

function Inventory() {
    const [inventories, setInventories] = useState([]);
    const [products, setProducts] = useState([]);
    const [racks, setRacks] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({ wipInventoryId: null, productId: "", rackId: "", quantity: 0 });
    const [errors, setErrors] = useState({});

    const [checkModal, setCheckModal] = useState({ open: false, type: null, item: null });
    const [checkQty, setCheckQty] = useState(0);

    const [toast, setToast] = useState(null);
    const user = getCurrentUser();
    const role = user?.role;

    // use backend original HTTPS host
    const base = "https://localhost:44321/api";
    const apiBase = `${base}/Inventory`;
    const productApi = `${base}/Product`;
    const rackApi = `${base}/Rack`;

    function showToast(msg, ms = 3000) {
        setToast(msg);
        setTimeout(() => setToast(null), ms);
    }

    async function loadAll() {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const [invRes, prodRes, rackRes] = await Promise.all([
                axios.get(apiBase, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(productApi, { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] })),
                axios.get(rackApi, { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] }))
            ]);
            setInventories(invRes.data || []);
            setProducts(prodRes.data || []);
            setRacks(rackRes.data || []);
        } catch (err) {
            console.error(err);
            showToast('Error loading data');
        } finally { setLoading(false); }
    }

    useEffect(() => {
        const timer = setTimeout(() => { loadAll(); }, 0);
        const onProductsUpdated = () => loadAll();
        const onInventoryUpdated = () => loadAll();
        window.addEventListener('products.updated', onProductsUpdated);
        window.addEventListener('inventory.updated', onInventoryUpdated);
        return () => { clearTimeout(timer); window.removeEventListener('products.updated', onProductsUpdated); window.removeEventListener('inventory.updated', onInventoryUpdated); };
    }, []);



    const getProductName = (id) => {
        const p = products.find(x => x.productId === id || x.productId === Number(id));
        return p ? p.name : id;
    };

    const filtered = inventories.filter(inv =>
        (String(inv.wipInventoryId) || '').includes(search) ||
        (getProductName(inv.productId) || '').toLowerCase().includes(search.toLowerCase()) ||
        (String(inv.rackId) || '').toLowerCase().includes(search.toLowerCase())
    );

    const totals = {
        totalItems: inventories.length,
        totalQuantity: inventories.reduce((s, i) => s + (Number(i.quantity) || 0), 0),
        totalCheckIns: inventories.reduce((s, i) => s + (Number(i.totalCheckIns) || 0), 0),
        totalCheckOuts: inventories.reduce((s, i) => s + (Number(i.totalCheckOuts) || 0), 0),
    };

    const openAdd = () => {
        setForm({ wipInventoryId: null, productId: "", rackId: "", quantity: 0 });
        setErrors({});
        setModalOpen(true);
    };

    const openEdit = (inv) => {
        if (role !== 'Admin') return; // only admin can edit
        setForm({ wipInventoryId: inv.wipInventoryId, productId: inv.productId, rackId: inv.rackId, quantity: inv.quantity });
        setErrors({});
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const validate = (f) => {
        const e = {};
        if (!f.productId) e.productId = 'Product is required';
        if (!f.rackId && f.rackId !== 0) e.rackId = 'Rack is required';
        if (f.quantity == null || isNaN(f.quantity) || Number(f.quantity) < 0) e.quantity = 'Quantity must be >= 0';
        return e;
    };

    const save = async () => {
        const e = validate(form);
        setErrors(e);
        if (Object.keys(e).length) return;
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            // Build DTO matching backend WipInventoryDto exactly
            const dto = {
                wipInventoryId: form.wipInventoryId ? Number(form.wipInventoryId) : 0,
                productId: Number(form.productId),
                rackId: Number(form.rackId),
                quantity: Number(form.quantity),
                lastUpdated: new Date().toISOString()
            };
            console.log(dto);

            if (form.wipInventoryId) {
                // Update existing inventory - send DTO directly
                await axios.put(`${apiBase}/${form.wipInventoryId}`, dto, { headers: { Authorization: `Bearer ${token}` } });
                showToast('Inventory updated');
            } else {
                // Create new inventory - send DTO directly (wipInventoryId: 0)
                await axios.post(apiBase, dto, { headers: { Authorization: `Bearer ${token}` } });
                showToast('Inventory added');
                // notify other components (dashboard/notifications)
                window.dispatchEvent(new Event('inventory.updated'));
            }
            await loadAll();
            closeModal();
        } catch (err) {
            console.error(err);
            showToast('Save failed');
        } finally { setLoading(false); }
    };

    const remove = async (inv) => {
        if (role !== 'Admin') return; // only admin can delete
        if (!window.confirm('Delete this inventory item?')) return;
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${apiBase}/${inv.wipInventoryId}`, { headers: { Authorization: `Bearer ${token}` } });
            showToast('Deleted');
            window.dispatchEvent(new Event('inventory.updated'));
            await loadAll();
        } catch (err) {
            console.error(err);
            showToast('Delete failed');
        } finally { setLoading(false); }
    };

    const openCheck = (type, inv) => {
        // Employees request checkout rather than directly reduce inventory
        if (type === 'out' && role === 'Employee') {
            // open request dialog instead
            setRequestModal({ open: true, item: inv, quantity: 0, reason: '' });
            return;
        }
        // supervisors cannot checkout
        if (type === 'out' && role === 'Supervisor') return;
        setCheckModal({ open: true, type, item: inv });
        setCheckQty(0);
    };

    const closeCheck = () => setCheckModal({ open: false, type: null, item: null });

    const doCheck = async () => {
        if (!checkQty || isNaN(checkQty) || Number(checkQty) <= 0) { showToast('Enter a valid quantity'); return; }
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const url = checkModal.type === 'in' ? `${apiBase}/checkin` : `${apiBase}/checkout`;
            const payload = { wipInventoryId: checkModal.item.wipInventoryId, quantity: Number(checkQty) };
            await axios.post(url, payload, { headers: { Authorization: `Bearer ${token}` } });
            showToast(checkModal.type === 'in' ? 'Check-In successful' : 'Check-Out successful');
            await loadAll();
            closeCheck();
        } catch (err) {
            console.error(err);
            showToast('Operation failed');
        } finally { setLoading(false); }
    };

    // Request modal state for employees
    const [requestModal, setRequestModal] = useState({ open: false, item: null, quantity: 0, reason: '' });

    const closeRequest = () => setRequestModal({ open: false, item: null, quantity: 0, reason: '' });

    const submitRequest = async () => {
        if (!requestModal.quantity || Number(requestModal.quantity) <= 0) { showToast('Enter a valid quantity'); return; }
        if (!requestModal.reason) { showToast('Reason is required'); return; }
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const payload = {
                wipInventoryId: requestModal.item.wipInventoryId,
                quantity: Number(requestModal.quantity),
                reason: requestModal.reason,
                requestedBy: user?.id
            };
            await axios.post(`${base}/CheckoutRequest`, payload, { headers: { Authorization: `Bearer ${token}` } });
            showToast('Request Submitted Successfully');
            // notify admin/notifications
            window.dispatchEvent(new Event('notifications.updated'));
            closeRequest();
        } catch (err) {
            console.error(err);
            showToast('Request failed');
        } finally { setLoading(false); }
    };

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Inventory</h2>
                <div className="d-flex">
                    <input className="form-control me-2" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
                    <button className="btn btn-outline-secondary me-2" onClick={loadAll} disabled={loading}>{loading ? <span className="spinner-border spinner-border-sm" /> : 'Refresh'}</button>
                    <button className="btn btn-primary" onClick={openAdd} disabled={loading}>Add Inventory</button>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-3 mb-2">
                    <div className="card text-bg-primary">
                        <div className="card-body">
                            <h6>Total Inventory Items</h6>
                            <h3>{totals.totalItems}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-2">
                    <div className="card text-bg-primary">
                        <div className="card-body">
                            <h6>Total Quantity</h6>
                            <h3>{totals.totalQuantity}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-2">
                    <div className="card text-bg-primary">
                        <div className="card-body">
                            <h6>Total Check-Ins</h6>
                            <h3>{totals.totalCheckIns}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-2">
                    <div className="card text-bg-primary">
                        <div className="card-body">
                            <h6>Total Check-Outs</h6>
                            <h3>{totals.totalCheckOuts}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow border-0">
                <div className="card-body">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Inventory ID</th>
                                <th>Product</th>
                                <th>Rack</th>
                                <th>Quantity</th>
                                <th>Last Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(inv => (
                                <tr key={inv.wipInventoryId}>
                                    <td>{inv.wipInventoryId}</td>
                                    <td>{getProductName(inv.productId)}</td>
                                    <td>{inv.rackId}</td>
                                    <td>{inv.quantity}</td>
                                    <td>{inv.lastUpdated ? new Date(inv.lastUpdated).toLocaleString() : ''}</td>
                                    <td>
                                        {role === 'Admin' && <button className="btn btn-warning btn-sm me-2" onClick={() => openEdit(inv)} disabled={loading}>Edit</button>}
                                        {role === 'Admin' && <button className="btn btn-danger btn-sm me-2" onClick={() => remove(inv)} disabled={loading}>Delete</button>}
                                        {(role === 'Admin' || role === 'Employee' || role === 'Supervisor') && <button className="btn btn-success btn-sm me-2" onClick={() => openCheck('in', inv)} disabled={loading}>Check-In</button>}
                                        {(role === 'Admin' || role === 'Employee') && <button className="btn btn-secondary btn-sm" onClick={() => openCheck('out', inv)} disabled={loading}>{role === 'Employee' ? 'Request Checkout' : 'Check-Out'}</button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {modalOpen && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{form.wipInventoryId ? 'Edit Inventory' : 'Add Inventory'}</h5>
                                <button type="button" className="btn-close" onClick={closeModal} disabled={loading}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                <label className="form-label">Product *</label>
                                    <select className={`form-select ${errors.productId ? 'is-invalid' : ''}`} value={form.productId} onChange={e => setForm({ ...form, productId: e.target.value })}>
                                        <option value="">-- Select Product --</option>
                                        {products.map(p => <option key={p.productId} value={p.productId}>{p.productCode ? `${p.productCode} - ${p.name}` : p.name}</option>)}
                                    </select>
                                    <div className="invalid-feedback">{errors.productId}</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Rack *</label>
                                    {racks.length === 0 ? (
                                        <div className="alert alert-secondary">No racks available</div>
                                    ) : (
                                        <select className={`form-select ${errors.rackId ? 'is-invalid' : ''}`} value={form.rackId} onChange={e => setForm({ ...form, rackId: e.target.value })}>
                                            <option value="">-- Select Rack --</option>
                                            {racks.map(r => <option key={r.rackId} value={r.rackId}>{r.rackCode || r.name || r.rackId}</option>)}
                                        </select>
                                    )}

            {/* Request Modal (Employee checkout requests) */}
            {requestModal.open && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Checkout Request - ID {requestModal.item?.wipInventoryId}</h5>
                                <button type="button" className="btn-close" onClick={closeRequest} disabled={loading}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Quantity</label>
                                    <input type="number" min={1} className="form-control" value={requestModal.quantity} onChange={e => setRequestModal({ ...requestModal, quantity: Number(e.target.value) })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Reason</label>
                                    <textarea className="form-control" value={requestModal.reason} onChange={e => setRequestModal({ ...requestModal, reason: e.target.value })}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeRequest} disabled={loading}>Cancel</button>
                                <button className="btn btn-primary" onClick={submitRequest} disabled={loading}>{loading ? <span className="spinner-border spinner-border-sm" /> : 'Submit Request'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
                                    <div className="invalid-feedback">{errors.rackId}</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Quantity *</label>
                                    <input type="number" min={0} className={`form-control ${errors.quantity ? 'is-invalid' : ''}`} value={form.quantity} onChange={e => setForm({ ...form, quantity: Number(e.target.value) })} />
                                    <div className="invalid-feedback">{errors.quantity}</div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeModal} disabled={loading}>Cancel</button>
                                <button className="btn btn-primary" onClick={save} disabled={loading}>{loading ? <span className="spinner-border spinner-border-sm" /> : 'Save'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Check Modal */}
            {checkModal.open && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{checkModal.type === 'in' ? 'Check-In' : 'Check-Out'} - ID {checkModal.item?.wipInventoryId}</h5>
                                <button type="button" className="btn-close" onClick={closeCheck} disabled={loading}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Quantity</label>
                                    <input type="number" min={1} className="form-control" value={checkQty} onChange={e => setCheckQty(Number(e.target.value))} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeCheck} disabled={loading}>Cancel</button>
                                <button className="btn btn-primary" onClick={doCheck} disabled={loading}>{loading ? <span className="spinner-border spinner-border-sm" /> : (checkModal.type === 'in' ? 'Check-In' : 'Check-Out')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 9999 }}>
                    <div className="toast show align-items-center text-bg-primary border-0">
                        <div className="d-flex">
                            <div className="toast-body">{toast}</div>
                            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToast(null)}></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Inventory;
                
