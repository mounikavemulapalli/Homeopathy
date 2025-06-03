import React from 'react';

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className="border rounded p-2 w-full cursor-pointer" {...props}>
    {children}
  </div>
));
SelectTrigger.displayName = "SelectTrigger";

export { SelectTrigger };
