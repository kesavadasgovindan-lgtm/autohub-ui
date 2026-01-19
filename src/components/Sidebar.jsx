import { NavLink } from "react-router-dom";
import { getUserRole } from "../utils/auth";

function Sidebar() {
  const role = getUserRole();

  return (
    <div className="sidebar">
      <h2 className="logo">AutoHub</h2>

      <nav>

        {/* ADMIN MENU */}
        {role === "Admin" && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/employees">Employees</NavLink>
            <NavLink to="/customers">Customers</NavLink>
            <NavLink to="/inventory">Inventory</NavLink>
            <NavLink to="/reports">Reports</NavLink>
          </>
        )}

        {/* STAFF MENU */}
        <NavLink to="/billing">Billing</NavLink>

      </nav>
    </div>
  );
}

export default Sidebar;
