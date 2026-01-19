import Sidebar from "../components/Sidebar";
import "../App.css";

function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
