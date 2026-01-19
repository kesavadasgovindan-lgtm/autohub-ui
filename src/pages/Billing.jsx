import AppLayout from "../layouts/AppLayout";
import "./Billing.css";

function Billing() {
  return (
    <AppLayout>
      <div className="billing-page">

        {/* HEADER */}
        <h1 className="billing-title">Tax Invoice</h1>

        {/* TOP SECTION */}
        <div className="billing-top">

          {/* CUSTOMER INFO */}
          <div className="billing-card">
            <h3>Customer Details</h3>

            <input placeholder="Customer Name" />
            <input placeholder="Address" />
            <input placeholder="Telephone" />
            <input placeholder="Email" />
            <input placeholder="Vehicle Registration" />
            <input placeholder="Vehicle Model" />
            <textarea placeholder="Remarks" />
          </div>

          {/* INVOICE INFO */}
          <div className="billing-card">
            <h3>Invoice Info</h3>

            <input type="date" />
            <input placeholder="Invoice Number" />
            <input placeholder="PO Number" />
            <input placeholder="Quote Number" />
            <input placeholder="TRN Number" />

            <select>
              <option>5% VAT</option>
              <option>0% VAT</option>
            </select>

            <div className="payment-methods">
  <label>
    <input type="checkbox" /> Cash
  </label>

  <label>
    <input type="checkbox" /> Credit
  </label>

  <label>
    <input type="checkbox" /> Cheque
  </label>
</div>

          </div>
        </div>

        {/* ITEM ENTRY */}
        <div className="billing-card">
          <h3>Add Item</h3>

          <div className="item-row">
            <input placeholder="Code" />
            <input placeholder="Product / Service" />
            <input placeholder="Description" />
            <input placeholder="Rate" />
            <input placeholder="Qty" />
            <input placeholder="Discount" />
            <button className="add-item-btn">ADD</button>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <div className="billing-card">
          <table className="billing-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Rate</th>
                <th>Qty</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" style={{ textAlign: "center", opacity: 0.5 }}>
                  No items added
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SUMMARY */}
        <div className="billing-bottom">

          <div className="summary-card">
            <h3>Summary</h3>

            <div className="summary-row">
              <span>Sub Total</span>
              <input />
            </div>

            <div className="summary-row">
              <span>Discount</span>
              <input />
            </div>

            <div className="summary-row">
              <span>Taxable Amount</span>
              <input />
            </div>

            <div className="summary-row">
              <span>VAT Amount</span>
              <input />
            </div>

            <div className="summary-row">
              <span>Net Amount</span>
              <input />
            </div>

            <div className="billing-actions">
              <button>Save</button>
              <button>Clear</button>
              <button>Search</button>
              <button className="primary">Print</button>
            </div>

          </div>
        </div>

      </div>
    </AppLayout>
  );
}

export default Billing;
