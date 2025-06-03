import React from 'react';
import { SelectTrigger } from './select-trigger';
import { SelectContent } from './select-content';
import { SelectItem } from './select-item';
import { SelectValue } from './select-value';

const Select = ({ children, ...props }) => {
  return (
    <select {...props} className="border rounded p-2 w-full">
      {children}
    </select>
  );
};

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
