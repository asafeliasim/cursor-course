import type { ApiKey } from "../types";
import { maskKey } from "../utils/keyHelpers";
import { Icon } from "./Icon";

type ApiKeysTableProps = {
  keys: ApiKey[];
  revealedId: string | null;
  copiedId: string | null;
  onReveal: (id: string | null) => void;
  onCopy: (key: string, id: string) => void;
  onEdit: (key: ApiKey) => void;
  onDelete: (id: string) => void;
};

export function ApiKeysTable({ keys, revealedId, copiedId, onReveal, onCopy, onEdit, onDelete }: ApiKeysTableProps) {
  return (
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-gray-200 bg-gray-50/80">
          <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
          <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Type</th>
          <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Usage</th>
          <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Key</th>
          <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 w-28">Options</th>
        </tr>
      </thead>
      <tbody>
        {keys.map((apiKey) => (
          <tr key={apiKey.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{apiKey.name}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{apiKey.type}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{apiKey.usage}</td>
            <td className="px-6 py-4 font-mono text-sm text-gray-600">
              {revealedId === apiKey.id ? apiKey.key : maskKey(apiKey.key)}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onReveal(revealedId === apiKey.id ? null : apiKey.id)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                  title={revealedId === apiKey.id ? "Hide" : "Reveal"}
                >
                  <Icon name="eye" className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onCopy(apiKey.key, apiKey.id)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                  title="Copy"
                >
                  <Icon name="copy" className="w-4 h-4" />
                  {copiedId === apiKey.id && <span className="sr-only">Copied</span>}
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(apiKey)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                  title="Edit"
                >
                  <Icon name="pencil" className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(apiKey.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  title="Delete"
                >
                  <Icon name="trash" className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
