import { OutlinedButton, PrimaryButton } from "shared/Button";
import { PrimaryHeading } from "shared/Typography";

export default function PageHeader({ pageTitle, pageBtn }) {
  return (
    <div className="flex justify-between items-center mb-2">
      <PrimaryHeading>{pageTitle}</PrimaryHeading>
      {pageBtn.outline ? (
        <OutlinedButton
          icon={pageBtn.icon}
          text={pageBtn.text}
          onClick={pageBtn.onClick}
        />
      ) : (
        <PrimaryButton
          icon={pageBtn.icon}
          text={pageBtn.text}
          onClick={pageBtn.onClick}
        />
      )}
    </div>
  );
}
