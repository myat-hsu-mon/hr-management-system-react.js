import { useEffect, useState } from "react";
import { getEmployees } from "api/employees";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      const {
        data: { status, data },
      } = await getEmployees();
      if (status === "success") {
        setEmployees(data);
      }
    };
    fetchAllEmployees();
  }, []);

  return [employees];
};
