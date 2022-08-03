import { Input } from "shared/Form";

export default function ContactInputs({ register }) {
  return (
    <div>
      <h3 className="font-bold text-xl dark:text-secondary-100 text-center mb-4">
        Emergency Contact
      </h3>
      <div className="grid gap-2 mb-8">
        <Input
          type="text"
          label="Name"
          placeholder="Mr. Luke"
          {...register("contactName")}
        />
        <Input
          type="text"
          label="Relation"
          placeholder="father"
          {...register("contactRelation")}
        />
        <Input
          type="text"
          label="Phone Number"
          placeholder="+95944844743"
          {...register("contactPhone")}
        />
      </div>
    </div>
  );
}
