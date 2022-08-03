import { useEffect, useState } from "react";
import { getEmploymentTypes } from "api/employmentTypes";

export const useEmploymentTypes = () => {
  const [employmentTypes, setEmploymentTypes] = useState([]);
  useEffect(() => {
    const fetchAllEmploymentTypes = async () => {
      const {
        data: { status, data },
      } = await getEmploymentTypes();
      if (status === "success") {
        setEmploymentTypes(data);
      }
    };
    fetchAllEmploymentTypes();
  }, []);
  return [employmentTypes];
};
