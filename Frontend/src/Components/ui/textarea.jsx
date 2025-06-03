// textarea.jsx
const Textarea = ({ className = "", ...props }) => {
  return (
    <textarea
      className={`w-full rounded-md border border-gray-300 px-4 py-2 text-sm resize-vertical min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Textarea;
