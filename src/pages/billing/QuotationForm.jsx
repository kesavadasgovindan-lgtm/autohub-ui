import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import "../../styles/quotation.css";


export default function QuotationForm() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [customerId, setCustomerId] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [remarks, setRemarks] = useState("");

  const [items, setItems] = useState([
    { description: "", rate: 0, quantity: 1, isLabour: false }
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { description: "", rate: 0, quantity: 1, isLabour: false }
    ]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const saveQuotation = async () => {
    const payload = {
      customerId: 1,
      vehicleNo,
      remarks,
      items
    };

    const response = await fetch("http://localhost:5119/api/quotations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      alert("Failed to save quotation");
      return;
    }

    navigate("/quotations");
  };

  return (
    <AppLayout>
      <h1>Create Quotation</h1>
       <div className="quotation-page">

        <div className="quotation-left">

      <div className="card">
        <input
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />

        <input
          placeholder="Vehicle Number"
          value={vehicleNo}
          onChange={(e) => setVehicleNo(e.target.value)}
        />

        <textarea
          placeholder="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </div>

      <div className="card">
        <h3>Items</h3>

        {items.map((item, i) => (
          <div key={i} className="item-row">
            <input
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                updateItem(i, "description", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Rate"
              value={item.rate}
              onChange={(e) =>
                updateItem(i, "rate", Number(e.target.value))
              }
            />

            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) =>
                updateItem(i, "quantity", Number(e.target.value))
              }
            />

            <label>
              <input
                type="checkbox"
                checked={item.isLabour}
                onChange={(e) =>
                  updateItem(i, "isLabour", e.target.checked)
                }
              />
              Labour
            </label>
          </div>
        ))}

        <button className="secondary-btn" onClick={addItem}>
          + Add Item
        </button>
      </div>

      <button className="primary-btn" onClick={saveQuotation}>
        Save Quotation
      </button>

      </div>

      <div className="quotation-right">

      </div>

</div>

    </AppLayout>
  );
}
