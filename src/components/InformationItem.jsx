import { Text, GrayText } from "../shared/Typography";

export default function InformationItem({ name, value }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
      <Text>{name}</Text>
      <GrayText className="lg:col-span-2">{value}</GrayText>
    </div>
  );
}
