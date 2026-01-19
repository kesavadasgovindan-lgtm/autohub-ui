import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Employees from "./pages/Employees";
import Billing from "./pages/Billing";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="*" element={<Navigate to="/" />} />

        {/* Login */}
        <Route
          path="/"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/employees"
  element={
    <ProtectedRoute>
      <Employees />
    </ProtectedRoute>
  }
/>

<Route
  path="/billing"
  element={
    <ProtectedRoute>
      <Billing />
    </ProtectedRoute>
  }
/>



      </Routes>
    </BrowserRouter>
  );
}

export default App;
