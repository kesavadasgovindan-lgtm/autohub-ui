import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  role: "Staff"
});

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5119/api/employees", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setEmployees(data);
  };

const saveEmployee = async () => {
  const token = localStorage.getItem("token");

  await fetch("http://localhost:5119/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      passwordHash: form.password,
      role: form.role,
      isActive: true
    })
  });

  setShowModal(false);
  setForm({ name: "", email: "", password: "", role: "Staff" });
  fetchEmployees();
};



  useEffect(() => {
    fetchEmployees();
  }, []);



  return (
    <AppLayout>
     <div className="page-header">
  <h1>Employees</h1>

  <button className="add-btn" onClick={() => setShowModal(true)}>
    + Add Employee
  </button>
</div>


      {/* Table */}
      <div className="table-container">
        <table className="dark-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td>
                  <span
                    className={
                      emp.isActive ? "status active" : "status inactive"
                    }
                  >
                    {emp.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Add Employee</h2>

           <input
  placeholder="Name"
  value={form.name}
  onChange={e => setForm({ ...form, name: e.target.value })}
/>

<input
  placeholder="Email"
  value={form.email}
  onChange={e => setForm({ ...form, email: e.target.value })}
/>

<input
  type="password"
  placeholder="Password"
  value={form.password}
  onChange={e => setForm({ ...form, password: e.target.value })}
/>

<select
  value={form.role}
  onChange={e => setForm({ ...form, role: e.target.value })}
>
  <option value="Staff">Staff</option>
  <option value="Admin">Admin</option>
</select>


            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
             <button className="primary" onClick={saveEmployee}>
  Save
</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

export default Employees;
