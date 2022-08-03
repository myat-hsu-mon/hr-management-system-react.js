import NoResultFoundImg from "../../src/no-result.svg";

export default function NoResultFound({ text, className }) {
  return (
    <div
      className={`py-4 flex-1 flex flex-col items-center justify-center ${className}`}
    >
      <img src={NoResultFoundImg} alt="No Search Result Found!" />
      <p class="text-sm text-dark dark:text-white font-medium">{text}</p>
    </div>
  );
}
