import { useEffect, useState } from "react";
import { getDepartments } from "api/departments";

export const useDepartment = () => {
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchAllDepartments = async () => {
      const {
        data: { status, data },
      } = await getDepartments();
      if (status === "success") {
        setDepartments(data);
      }
    };
    fetchAllDepartments();
  }, []);
  return [departments];
};
