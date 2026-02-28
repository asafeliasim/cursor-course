export type ApiKeyRow = {
    id: string;
    name: string;
    type: "dev" | "prod";
    key: string;
    usage: number;
    created_at: string;
  };
  
 
  export function rowToApiKey(row: ApiKeyRow | Record<string, unknown>) {
    const r = row as Record<string, unknown>;
    return {
      id: String(r?.id ?? ""),
      name: String(r?.name ?? ""),
      type: (r?.type === "prod" ? "prod" : "dev") as "dev" | "prod",
      value: String(r?.value ?? ""),
      usage: Number(r?.usage) || 0,
      createdAt: String(r?.created_at ?? ""),
    };
  }   