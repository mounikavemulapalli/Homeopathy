import React from 'react';

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className="border rounded mt-1 overflow-auto" {...props}>
    {children}
  </div>
));
SelectContent.displayName = "SelectContent";

export { SelectContent };
