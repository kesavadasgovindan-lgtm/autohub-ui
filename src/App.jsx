import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Employees from "./pages/Employees";
import Billing from "./pages/Billing";
import QuotationList from "./pages/quotations/QuotationList";
import QuotationForm from "./pages/billing/QuotationForm";




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

<Route
  path="/quotations"
  element={
    <ProtectedRoute>
      <QuotationList />
    </ProtectedRoute>
  }
/>

<Route
  path="/quotations/new"
  element={
    <ProtectedRoute>
      <QuotationForm />
    </ProtectedRoute>
  }
/>




      </Routes>
    </BrowserRouter>
  );
}

export default App;
