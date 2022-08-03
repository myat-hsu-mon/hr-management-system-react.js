import { PrimaryButton } from "shared/Button";
import { Input, Select } from "shared/Form";

export default function PageFilter({ filters }) {
  return (
    <div className="flex justify-between items-end mb-6 gap-1">
      {filters.map((item, index) => (
        <div className="flex-1" key={index}>
          {item.type === "button" || item.type === "submit" ? (
            <PrimaryButton
              type={item.type}
              text={item.text}
              widthFull
              onClick={item?.onClick}
            />
          ) : item.type === "select" ? (
            <Select label={item.label} items={item.items} {...item} />
          ) : (
            <Input
              type={item.type}
              label={item.label}
              placeholder={item.placeholder}
              {...item}
            />
          )}
        </div>
      ))}
    </div>
  );
}
