export type KeyType = "dev" | "prod";

export type ApiKey = {
  id: string;
  name: string;
  type: KeyType;
  key: string;
  usage: number;
  createdAt: string;
};
