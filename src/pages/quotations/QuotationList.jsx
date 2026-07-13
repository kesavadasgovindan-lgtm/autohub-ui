import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import "../../styles/quotation.css";
import { getUserRole } from "../../utils/auth";

export default function QuotationList() {
  const [quotations, setQuotations] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = getUserRole();

 const loadQuotations = useCallback(async () => {
    const res = await fetch("http://localhost:5119/api/quotations", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await res.json();
    setQuotations(data);
}, [token]);

 useEffect(() => {
    loadQuotations();
}, [loadQuotations]);


  const approveQuotation = async (id) => {
    const confirm = window.confirm("Approve this quotation?");
    if (!confirm) return;

    await fetch(`http://localhost:5119/api/quotations/${id}/approve`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    loadQuotations();
  };

  // ✅ CONVERT QUOTATION → INVOICE
  const convertQuotation = async (id) => {
    const confirm = window.confirm(
      "Convert this quotation to invoice?"
    );
    if (!confirm) return;

    const res = await fetch(
      `http://localhost:5119/api/quotations/${id}/convert`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    // 🔽 navigate to billing with invoice ID
    
    navigate(`/billing?invoiceId=${data.id}`);

  };

  return (
    <AppLayout>
      <div className="page-header">
        <h1>Quotations</h1>

        <button
          className="primary-btn"
          onClick={() => navigate("/quotations/new")}
        >
          + Create Quotation
        </button>
      </div>

      <div className="table-container">
        <table className="dark-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {quotations.map(q => (
              <tr key={q.id}>
                <td>{q.quotationNumber}</td>
                <td>{q.customer?.name}</td>

                <td>
                  <span className={`status-badge ${q.status.toLowerCase()}`}>
                    {q.status}
                  </span>
                </td>

                <td>{q.netAmount}</td>

                <td>
                  {/* ADMIN APPROVAL */}
                  {role === "Admin" && q.status === "Draft" && (
                    <button
                      className="secondary-btn"
                      onClick={() => approveQuotation(q.id)}
                    >
                      Approve
                    </button>
                  )}

                  {/* CONVERT TO INVOICE */}
                  {q.status === "Approved" && (
                    <button
                      className="primary-btn"
                      onClick={() => convertQuotation(q.id)}
                    >
                      Convert
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
