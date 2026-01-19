import "../App.css";

function AuthLayout({ children }) {
  return (
    <div className="app-container">
      <div className="car-bg"></div>

      <div className="login-wrapper">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
