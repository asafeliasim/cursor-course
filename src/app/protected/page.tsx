"use client";

import { useEffect, useCallback, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Toast, type ToastVariant } from "@/app/components/Toast";
import Link from "next/link";

const STORAGE_KEY = "dandi_validate_key";

export default function ProtectedPage() {
  const [toast, setToast] = useState<{ message: string; variant: ToastVariant } | null>(null);
  const [checked, setChecked] = useState(false);

  const showToast = useCallback((message: string, variant: ToastVariant = "success") => {
    setToast({ message, variant });
  }, []);
  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (typeof window === "undefined" || checked) return;
    const keyToValidate = sessionStorage.getItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    setChecked(true);
    if (!keyToValidate) return;

    async function validate() {
      const { data, error } = await supabase
        .from("api_keys")
        .select("id")
        .eq("value", keyToValidate)
        .maybeSingle();

      if (error) {
        showToast("Invalid api key", "error");
        return;
      }
      if (data) {
        showToast("Valid api key, /protected can be accessed", "success");
      } else {
        showToast("Invalid api key", "error");
      }
    }
    validate();
  }, [checked, showToast]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans text-gray-900">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-8 max-w-md w-full text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Protected page</h1>
        <p className="text-sm text-gray-600 mb-6">
          This page validates your API key. Check the notification above for the result.
        </p>
        <Link
          href="/dashboards/playground"
          className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Back to API Playground
        </Link>
        <div className="mt-4">
          <Link href="/dashboards" className="text-sm text-gray-500 hover:text-gray-700">
            ← Dashboards
          </Link>
        </div>
      </div>

      <Toast
        message={toast?.message ?? null}
        variant={toast?.variant ?? "success"}
        onDismiss={dismissToast}
      />
    </div>
  );
}
