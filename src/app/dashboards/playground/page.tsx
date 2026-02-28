"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Toast, type ToastVariant } from "@/app/components/Toast";
import { Sidebar } from "../components/Sidebar";

const STORAGE_KEY = "dandi_validate_key";

export default function PlaygroundPage() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: ToastVariant } | null>(null);
  const showToast = useCallback((message: string, variant: ToastVariant = "success") => {
    setToast({ message, variant });
  }, []);
  const dismissToast = useCallback(() => setToast(null), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const key = apiKey.trim();
    if (!key) return;
    setSubmitting(true);
    const { data, error } = await supabase
      .from("api_keys")
      .select("id")
      .eq("value", key)
      .maybeSingle();
    setSubmitting(false);
    if (error) {
      showToast("Invalid api key", "error");
      return;
    }
    if (data) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STORAGE_KEY, key);
      }
      router.push("/protected");
    } else {
      showToast("Invalid api key", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <p className="text-sm text-gray-500 mb-1">
            <Link href="/dashboards" className="hover:text-gray-700">Dashboards</Link>
            {" / "}
            API Playground
          </p>
          <h1 className="text-2xl font-bold text-gray-900">API Playground</h1>
        </header>

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-md">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Validate API key</h2>
              <p className="text-sm text-gray-600 mb-4">
                Enter an API key to validate. You will only be redirected to the protected page if the key is valid.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <input
                    id="api-key"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="dandi-dev-... or dandi-prod-..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoComplete="off"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!apiKey.trim() || submitting}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {submitting ? "Validating…" : "Submit & go to /protected"}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>

      <Toast
        message={toast?.message ?? null}
        variant={toast?.variant ?? "success"}
        onDismiss={dismissToast}
      />
    </div>
  );
}
