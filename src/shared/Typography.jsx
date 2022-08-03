export const PrimaryHeading = ({ children, className }) => {
  return (
    <h2 className={`${className} font-bold uppercase dark:text-gray-50`}>
      {children}
    </h2>
  );
};

export const SecondaryHeadingBold = ({ children, className }) => {
  return (
    <h3
      className={`${className} font-bold text-lg dark:text-secondary-100 leading-none`}
    >
      {children}
    </h3>
  );
};

export const SecondaryHeadingMedium = ({ children, className }) => {
  return (
    <h3
      className={`${className} font-medium text-lg dark:text-secondary-100 leading-none`}
    >
      {children}
    </h3>
  );
};

export const Text = ({ children, className }) => {
  return (
    <p className={`${className} font-medium dark:text-secondary-100`}>
      {children}
    </p>
  );
};

export const GrayText = ({ children, className }) => {
  return <p className={`${className} text-gray-500`}>{children}</p>;
};
