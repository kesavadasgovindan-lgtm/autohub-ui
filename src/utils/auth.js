import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  const decoded = jwtDecode(token);

  return decoded[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];
};

export const logout = () => {
  localStorage.removeItem("token");
};
