// input.jsx
const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Input;
