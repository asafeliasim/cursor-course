"use client";

import React, { useEffect } from "react";

export type ToastVariant = "success" | "error" | "info";

type ToastProps = {
  message: string | null;
  variant?: ToastVariant;
  duration?: number;
  onDismiss: () => void;
};

const variantStyles: Record<ToastVariant, string> = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
};

function CheckIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const variantIcons: Record<ToastVariant, () => React.ReactElement> = {
  success: CheckIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

export function Toast({ message, variant = "success", duration = 3000, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  if (!message) return null;

  const Icon = variantIcons[variant];
  const styles = variantStyles[variant];

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${styles}`}
      role="alert"
    >
      <Icon />
      {message}
    </div>
  );
}
