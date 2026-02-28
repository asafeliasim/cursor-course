"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { Toast, type ToastVariant } from "@/app/components/Toast";
import { useApiKeys } from "./hooks/useApiKeys";
import { Sidebar } from "./components/Sidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { ApiKeysCard } from "./components/ApiKeysCard";
import { CreateKeyModal } from "./components/CreateKeyModal";
import { EditKeyModal } from "./components/EditKeyModal";
import { DeleteKeyModal } from "./components/DeleteKeyModal";
import { CreatedKeyRevealModal } from "./components/CreatedKeyRevealModal";

export default function DashboardsPage() {
  const [toast, setToast] = useState<{ message: string; variant: ToastVariant } | null>(null);
  const showToast = useCallback((message: string, variant: ToastVariant = "success") => {
    setToast({ message, variant });
  }, []);
  const dismissToast = useCallback(() => setToast(null), []);

  const api = useApiKeys({
    onSuccess: (message, variant = "success") => showToast(message, variant),
  });

  const handleCopy = useCallback(
    (key: string, id: string) => {
      api.copyToClipboard(key, id, () => showToast("Key copied to clipboard"));
    },
    [api, showToast]
  );

  if (!api.mounted || api.loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (api.error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="rounded-xl bg-white border border-gray-200 p-6 max-w-md">
          <p className="text-red-600 font-medium mb-2">Error loading API keys</p>
          <p className="text-sm text-gray-600 mb-4">{api.error}</p>
          <button
            type="button"
            onClick={() => api.fetchKeys()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl space-y-6">
            <ApiKeysCard
              keys={api.keys}
              revealedId={api.revealedId}
              copiedId={api.copiedId}
              onReveal={api.setRevealedId}
              onCopy={handleCopy}
              onEdit={api.openEdit}
              onDelete={api.setDeleteId}
              onOpenCreate={api.openCreate}
            />

            <div className="rounded-xl border border-gray-200 bg-white px-6 py-5">
              <p className="text-sm text-gray-600 mb-3">
                Have any questions, feedback or need support? We&apos;d love to hear from you!
              </p>
              <button
                type="button"
                className="rounded-lg border border-blue-500 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
              >
                Contact us
              </button>
            </div>
          </div>
        </main>

        <footer className="border-t border-gray-200 bg-white px-8 py-4 text-center text-sm text-gray-500">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>·</span>
            <a href="#" className="hover:text-gray-700">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-700">Terms</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-700">Contact</a>
          </div>
          <p className="mt-2">© {new Date().getFullYear()} Dandi. All rights reserved.</p>
        </footer>
      </div>

      {api.createOpen && (
        <CreateKeyModal
          name={api.newName}
          keyType={api.newKeyType}
          keyValue={api.newKeyValue}
          onNameChange={api.setNewName}
          onKeyTypeChange={api.setNewKeyType}
          onKeyValueChange={api.setNewKeyValue}
          onClose={() => api.setCreateOpen(false)}
          onCreate={api.handleCreate}
        />
      )}

      {api.createdKeyReveal && (
        <CreatedKeyRevealModal
          keyValue={api.createdKeyReveal}
          onClose={() => api.setCreatedKeyReveal(null)}
          onCopy={handleCopy}
        />
      )}

      {api.editOpen && api.editingKey && (
        <EditKeyModal
          apiKey={api.editingKey}
          editName={api.editName}
          onEditNameChange={api.setEditName}
          onClose={() => api.setEditOpen(false)}
          onSave={api.handleEdit}
        />
      )}

      {api.deleteId && (
        <DeleteKeyModal
          onClose={() => api.setDeleteId(null)}
          onConfirm={() => api.handleDelete(api.deleteId!)}
        />
      )}

      <Toast
        message={toast?.message ?? null}
        variant={toast?.variant ?? "success"}
        onDismiss={dismissToast}
      />
    </div>
  );
}
