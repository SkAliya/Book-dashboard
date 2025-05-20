// src/components/ui/button.jsx
import React from "react";
import classNames from "classnames";

export function Button({ children, className, variant = "default", size = "md", ...props }) {
  const base = "px-4 py-2 rounded font-medium transition";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };
  const sizes = {
    sm: "text-sm py-1 px-3",
    md: "text-base",
  };
  return (
    <button
      className={classNames(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
