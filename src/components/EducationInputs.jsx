//shared
import { Input } from "shared/Form";

export default function EducationInputs({ register, errors }) {
  return (
    <div>
      <h3 className="font-bold text-xl dark:text-secondary-100 text-center mb-4">
        Education
      </h3>
      <div className="grid grid-cols-2 gap-2 mb-8">
        <Input
          type="text"
          label="Name of institude"
          placeholder="Harvard University"
          {...register("institudeName")}
        />
        <Input
          type="text"
          label="Degree/ Diploma"
          placeholder=""
          {...register("degree")}
        />
        <Input
          type="date"
          label="Starting Year"
          {...register("institudeStartingYear")}
        />
        <Input
          type="date"
          label="Ending Year"
          {...register("institudeEndingYear")}
        />
      </div>
    </div>
  );
}
