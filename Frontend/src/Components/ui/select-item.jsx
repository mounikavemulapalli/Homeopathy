import React from 'react';

const SelectItem = React.forwardRef(({ className, value, children, ...props }, ref) => (
  <div ref={ref} className="px-2 py-1 hover:bg-gray-100 cursor-pointer" value={value} {...props}>
    {children}
  </div>
));
SelectItem.displayName = "SelectItem";

export { SelectItem };
