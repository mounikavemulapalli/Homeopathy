import React from 'react';

const SelectValue = React.forwardRef(({ className, placeholder, children, ...props }, ref) => (
  <span ref={ref} className="block truncate" {...props}>
    {children || placeholder}
  </span>
));
SelectValue.displayName = "SelectValue";

export { SelectValue };
