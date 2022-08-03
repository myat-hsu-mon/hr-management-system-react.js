export const PrimaryButton = ({
  text,
  icon: Icon,
  type = "button",
  color = "primary",
  widthFull = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        widthFull === true ? "w-full" : ""
      } bg-${color}-600 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`}
    >
      {Icon && <Icon className="h-4 w-4 mr-2" />}
      {text}
    </button>
  );
};

export const OutlinedButton = ({
  text,
  icon: Icon,
  type = "button",
  widthFull = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        widthFull === true ? "w-full" : ""
      } flex justify-center items-center py-2 px-4 border border-primary-600 hover:border-primary-700 rounded-md shadow-sm text-sm font-medium text-primary-600 hover:text-primary-700 bg-transparent  focus:outline-none focus:ring-none`}
    >
      {Icon && <Icon className="h-4 w-4 mr-2" />}
      {text}
    </button>
  );
};

export const CircularButton = ({ icon: Icon, color = "primary", onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center justify-center p-1 mr-1 border border-transparent rounded-full shadow-sm text-white bg-${color}-600 hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`}
  >
    <Icon className="h-5 w-5" aria-hidden="true" />
  </button>
);
