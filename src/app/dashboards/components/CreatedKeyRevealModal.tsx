type CreatedKeyRevealModalProps = {
  keyValue: string;
  onClose: () => void;
  onCopy: (key: string, id: string) => void;
};

export function CreatedKeyRevealModal({ keyValue, onClose, onCopy }: CreatedKeyRevealModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-2">API Key created</h2>
        <p className="text-sm text-gray-500 mb-3">Copy it now. You won&apos;t see it again in full.</p>
        <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-3 font-mono text-sm break-all">
          <span className="flex-1 text-gray-900">{keyValue}</span>
          <button
            type="button"
            onClick={() => onCopy(keyValue, "reveal")}
            className="shrink-0 rounded bg-gray-700 px-2 py-1 text-xs text-white hover:bg-gray-600"
          >
            Copy
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Done
        </button>
      </div>
    </div>
  );
}
