import { Routes as RoutesConfig, Route, useNavigate } from "react-router-dom";

import ProtectedRoute from "routes/ProtectedRoute";
import Login from "pages/Login";
import Signup from "pages/Signup";
import Dashboard from "pages/Dashboard";
import Employees from "pages/Employees/Employees";
import NewEmployeeForm from "pages/Employees/NewEmployeeForm";
import EmployeeDetail from "pages/Employees/EmployeeDetail";
import Payroll from "pages/Payroll/Payroll";
import Leaves from "pages/Leaves/Leaves";
import Promotions from "pages/Promotions/Promotions";
import Projects from "pages/Projects/Projects";
import NewProjectForm from "pages/Projects/NewProjectForm";
import Overtimes from "pages/Overtimes/Overtimes";
import NewLeaveForm from "pages/Leaves/NewLeaveForm";
import NewOvertimeForm from "pages/Overtimes/NewOvertimeForm";
import NewPayrollForm from "pages/Payroll/NewPayrollForm";
import PayrollDetail from "pages/Payroll/PayrollDetail";
import NewPromotionForm from "pages/Promotions/NewPromotionForm";
import { useState } from "react";
import Loading from "shared/PageLoading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, signOut } from "store/slices/userSlice";
import { service } from "config/service";
import { verifyToken } from "api/auth";

export default function Routes() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    const verifyTokenValidation = async () => {
      try {
        //verify token
        const token = localStorage.getItem("token");
        if (token) {
          service.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const {
            data: { status, data },
          } = await verifyToken();
          //if token success, set user and isAuth
          if (status === "success") {
            dispatch(setUser({ employee: data, token }));
          }
        }
      } catch (error) {
        dispatch(signOut());
      } finally {
        setLoading(false);
      }
    };
    verifyTokenValidation();
  }, []);

  if (loading) return <Loading />;

  return (
    <RoutesConfig>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="employees/new" element={<NewEmployeeForm />} />
        <Route path="employees/:id" element={<EmployeeDetail />} />
        <Route path="payroll" element={<Payroll />} />
        <Route path="payroll/new" element={<NewPayrollForm />} />
        <Route path="payroll/:id" element={<PayrollDetail />} />
        <Route path="payroll/:id/edit" element={<NewPayrollForm />} />
        <Route path="overtimes" element={<Overtimes />} />
        <Route path="overtimes/new" element={<NewOvertimeForm />} />
        <Route path="overtimes/:id/edit" element={<NewOvertimeForm />} />
        <Route path="leaves" element={<Leaves />} />
        <Route path="leaves/new" element={<NewLeaveForm />} />
        <Route path="leaves/:id/edit" element={<NewLeaveForm />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="promotions/new" element={<NewPromotionForm />} />
        <Route path="promotions/:id/edit" element={<NewPromotionForm />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/new" element={<NewProjectForm />} />
        <Route path="projects/:id/edit" element={<NewProjectForm />} />
      </Route>
    </RoutesConfig>
  );
}
