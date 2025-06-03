const Button = ({ type = "button", className, children, onClick }) => (
  <button
    type={type}
    className={`bg-blue-500 text-white py-2 px-4 rounded-md ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);
