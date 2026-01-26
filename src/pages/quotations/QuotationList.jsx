import { useEffect, useState } from "react";
import AppLayout from "../../layouts/AppLayout";
import "./quotation.css";


export default function QuotationList() {
  const [quotations, setQuotations] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const load = async () => {
      const res = await fetch("http://localhost:5119/api/quotations", {
        headers: {
         Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setQuotations(data);
    };

    load();
  }, [token]);

  return (
    <AppLayout>
      <h1>Quotations</h1>

   

  <button
    className="primary-btn"
    onClick={() => window.location.href = "/quotations/new"}
  >
    + Create Quotation
  </button>


      <div className="table-container">
        <table className="dark-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {quotations.map(q => (
              <tr key={q.id}>
                <td>{q.quotationNumber}</td>
                <td>{q.customer?.name}</td>
                <td>{q.status}</td>
                <td>{q.netAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
