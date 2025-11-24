import { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import ValidarCupom from "./ValidarCupom";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isAdminLoggedIn") === "true"
  );

  const handleLoginSuccess = () => {
    sessionStorage.setItem("isAdminLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAdminLoggedIn");
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <ValidarCupom onLogout={handleLogout} />
  ) : (
    <AdminLogin onLoginSuccess={handleLoginSuccess} />
  );
}
