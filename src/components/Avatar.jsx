export default function Avatar({ name }) {
  return (
    <div className="h-10 w-10 rounded-full bg-primary-500 text-white  uppercase flex items-center justify-center">
      {name[0]}
    </div>
  );
}
