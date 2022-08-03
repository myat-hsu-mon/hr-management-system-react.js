import { SecondaryHeadingBold } from "./Typography";

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={`${className} bg-white dark:bg-secondary-400 rounded-md shadow px-6 py-8`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Header = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

Card.Title = ({ children, ...props }) => {
  return <SecondaryHeadingBold {...props}>{children}</SecondaryHeadingBold>;
};

Card.Content = ({ children, ...props }) => <div {...props}>{children}</div>;

export default Card;
