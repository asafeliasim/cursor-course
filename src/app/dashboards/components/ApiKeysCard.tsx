import type { ApiKey } from "../types";
import { Icon } from "./Icon";
import { ApiKeysTable } from "./ApiKeysTable";

type ApiKeysCardProps = {
  keys: ApiKey[];
  revealedId: string | null;
  copiedId: string | null;
  onReveal: (id: string | null) => void;
  onCopy: (key: string, id: string) => void;
  onEdit: (key: ApiKey) => void;
  onDelete: (id: string) => void;
  onOpenCreate: () => void;
};

export function ApiKeysCard({
  keys,
  revealedId,
  copiedId,
  onReveal,
  onCopy,
  onEdit,
  onDelete,
  onOpenCreate,
}: ApiKeysCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
        <button
          type="button"
          onClick={onOpenCreate}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Icon name="plus" className="w-4 h-4" />
          Add
        </button>
      </div>
      <div className="overflow-x-auto">
        {keys.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500 text-sm mb-4">No API keys yet. Create one to get started.</p>
            <button
              type="button"
              onClick={onOpenCreate}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Icon name="plus" className="w-4 h-4" />
              Create API Key
            </button>
          </div>
        ) : (
          <ApiKeysTable
            keys={keys}
            revealedId={revealedId}
            copiedId={copiedId}
            onReveal={onReveal}
            onCopy={onCopy}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
}
