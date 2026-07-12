import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

export default function BillingForm({ mode }) {
  const isQuotation = mode === "quotation";

  const [customerId, setCustomerId] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [remarks, setRemarks] = useState("");
  const [items, setItems] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ SINGLE SOURCE OF TRUTH
  const invoiceId = new URLSearchParams(location.search).get("invoiceId");

  // ✅ LOAD INVOICE WHEN OPENED FROM QUOTATION
  useEffect(() => {
    if (!invoiceId) return;

    const loadInvoice = async () => {
      const res = await fetch(
        `http://localhost:5119/api/invoices/${invoiceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setCustomerId(data.customerId);
      setVehicleNo(data.vehicleNo ?? "");
      setRemarks(data.remarks ?? "");

      setItems(
        data.items.map(i => ({
          description: i.description,
          rate: i.rate,
          quantity: i.quantity,
          isLabour: i.isLabour
        }))
      );
    };

    loadInvoice();
  }, [invoiceId, token]);

  const addItem = () => {
    setItems([
      ...items,
      {
        description: "",
        rate: 0,
        quantity: 1,
        isLabour: false
      }
    ]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const calculateTotal = () => {
    return items.reduce(
      (sum, i) => sum + i.rate * i.quantity,
      0
    );
  };

  const save = async () => {
    const payload = {
      customerId,
      vehicleNo,
      remarks,
      items
    };

    const url = isQuotation
      ? "http://localhost:5119/api/quotations"
      : "http://localhost:5119/api/invoices";

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    alert(isQuotation ? "Quotation saved" : "Invoice saved");
  };

  const cancel = () => {
    if (isQuotation) {
      navigate("/quotations");
    } else {
      navigate("/billing");
    }
  };

  return (
    <AppLayout>
      <h1>{isQuotation ? "Create Quotation" : "Create Invoice"}</h1>

      {/* CUSTOMER */}
      <div className="billing-card">
        <input
          placeholder="Customer ID"
          value={customerId}
          onChange={e => setCustomerId(e.target.value)}
        />

        <input
          placeholder="Vehicle Number"
          value={vehicleNo}
          onChange={e => setVehicleNo(e.target.value)}
        />

        <textarea
          placeholder="Remarks"
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
        />
      </div>

      {/* ITEMS */}
      <div className="billing-card">
        <h3>Items</h3>

        {items.map((item, i) => (
          <div key={i} className="item-row">
            <input
              placeholder="Description"
              value={item.description}
              onChange={e =>
                updateItem(i, "description", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Rate"
              value={item.rate}
              onChange={e =>
                updateItem(i, "rate", +e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={e =>
                updateItem(i, "quantity", +e.target.value)
              }
            />

            <label>
              <input
                type="checkbox"
                checked={item.isLabour}
                onChange={e =>
                  updateItem(i, "isLabour", e.target.checked)
                }
              />
              Labour
            </label>
          </div>
        ))}

        <button className="add-btn" onClick={addItem}>
          + Add Item
        </button>
      </div>

      {/* TOTAL */}
      <div className="billing-card">
        <h3>Total: {calculateTotal()}</h3>
      </div>

      {/* ACTIONS */}
      <div className="billing-actions">
        <button className="primary" onClick={save}>
          {isQuotation ? "Save Quotation" : "Save Invoice"}
        </button>

        <button className="secondary" onClick={cancel}>
          Cancel
        </button>
      </div>
    </AppLayout>
  );
}
