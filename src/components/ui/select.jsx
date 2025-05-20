// src/components/ui/select.jsx
import React from "react";

export function Select({ children, onValueChange, ...props }) {
  return (
    <select onChange={(e) => onValueChange(e.target.value)} {...props}>
      {children}
    </select>
  );
}

export function SelectTrigger({ children, ...props }) {
  return <span {...props}>{children}</span>;
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
