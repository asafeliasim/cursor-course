import type { KeyType } from "../types";

type CreateKeyModalProps = {
  name: string;
  keyType: KeyType;
  keyValue: string;
  onNameChange: (v: string) => void;
  onKeyTypeChange: (v: KeyType) => void;
  onKeyValueChange: (v: string) => void;
  onClose: () => void;
  onCreate: () => void;
};

export function CreateKeyModal({
  name,
  keyType,
  keyValue,
  onNameChange,
  onKeyTypeChange,
  onKeyValueChange,
  onClose,
  onCreate,
}: CreateKeyModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Create API Key</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="e.g. default"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={keyType}
              onChange={(e) => onKeyTypeChange(e.target.value as KeyType)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="dev">dev</option>
              <option value="prod">prod</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key (leave empty to generate)</label>
            <input
              type="text"
              value={keyValue}
              onChange={(e) => onKeyValueChange(e.target.value)}
              placeholder="Auto-generated if empty"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onCreate}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
