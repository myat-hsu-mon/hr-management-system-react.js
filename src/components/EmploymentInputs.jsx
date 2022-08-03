import { useEffect } from "react";
//shared
import { Select } from "shared/Form";

export default function EmploymentInputs({
  register,
  errors,
  employmentTypes,
}) {
  return (
    <div>
      <h3 className="font-bold text-xl dark:text-secondary-100 text-center mb-4">
        Employment Information
      </h3>
      <div className="grid gap-2 mb-8">
        <Select
          label="Employment Types"
          {...register("employmentType")}
          items={employmentTypes}
        />
      </div>
    </div>
  );
}
