import { Navigate, Outlet } from "react-router-dom";

import SidebarLayout from "containers/SidebarLayout";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      {isAuthenticated ? (
        <SidebarLayout>
          <Outlet />
        </SidebarLayout>
      ) : (
        <Navigate to="login" replace />
      )}
    </>
  );
}
