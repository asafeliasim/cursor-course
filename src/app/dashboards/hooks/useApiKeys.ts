"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { rowToApiKey } from "@/lib/supabase/types";
import type { ApiKey, KeyType } from "../types";
import { generateKey } from "../utils/keyHelpers";

type OnSuccess = (message: string, variant?: "success" | "error" | "info") => void;

function normalizeRow(row: Record<string, unknown>): ApiKey {
  const mapped = rowToApiKey(row) as ApiKey & { value?: string };
  return {
    ...mapped,
    key: mapped.value ?? mapped.key ?? "",
  };
}

export function useApiKeys(options?: { onSuccess?: OnSuccess }) {
  const onSuccess = options?.onSuccess;
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newKeyType, setNewKeyType] = useState<KeyType>("dev");
  const [newKeyValue, setNewKeyValue] = useState("");
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [editName, setEditName] = useState("");
  const [createdKeyReveal, setCreatedKeyReveal] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revealedId, setRevealedId] = useState<string | null>(null);

  const fetchKeys = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: e } = await supabase
      .from("api_keys")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    setMounted(true);
    if (e) {
      setError(e.message);
      setKeys([]);
      return;
    }
    setKeys((data ?? []).filter(Boolean).map((row: Record<string, unknown>) => normalizeRow(row)));
  }, []);

  useEffect(() => {
    fetchKeys();
  }, [fetchKeys]);

  const handleCreate = useCallback(async () => {
    setError(null);
    const name = newName.trim() || "default";
    const keyValue = newKeyValue.trim() || generateKey(newKeyType);
    const { data, error: e } = await supabase
      .from("api_keys")
      .insert({ name, type: newKeyType, value: keyValue, usage: 0 })
      .select()
      .single();
    if (e) {
      setError(e.message);
      return;
    }
    const apiKey = normalizeRow(data as Record<string, unknown>);
    setKeys((prev) => [apiKey, ...prev]);
    setCreatedKeyReveal(apiKey.key);
    setNewName("");
    setNewKeyType("dev");
    setNewKeyValue("");
    setCreateOpen(false);
  }, [newName, newKeyType, newKeyValue]);

  const handleEdit = useCallback(async () => {
    if (!editingKey) return;
    setError(null);
    const name = editName.trim() || editingKey.name;
    const { error: e } = await supabase.from("api_keys").update({ name }).eq("id", editingKey.id);
    if (e) {
      setError(e.message);
      return;
    }
    setKeys((prev) => prev.map((k) => (k.id === editingKey.id ? { ...k, name } : k)));
    setEditOpen(false);
    setEditingKey(null);
    setEditName("");
    onSuccess?.("API key updated");
  }, [editingKey, editName, onSuccess]);

  const handleDelete = useCallback(async (id: string) => {
    setError(null);
    const { error: e } = await supabase.from("api_keys").delete().eq("id", id);
    if (e) {
      setError(e.message);
      return;
    }
    setKeys((prev) => prev.filter((k) => k.id !== id));
    setDeleteId(null);
    onSuccess?.("API key deleted");
  }, [onSuccess]);

  const openCreate = useCallback(() => {
    setCreateOpen(true);
    setCreatedKeyReveal(null);
  }, []);

  const openEdit = useCallback((key: ApiKey) => {
    setEditingKey(key);
    setEditName(key.name);
    setEditOpen(true);
  }, []);

  const copyToClipboard = useCallback((key: string, id: string, onCopied?: () => void) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    onCopied?.();
  }, []);

  return {
    keys,
    mounted,
    loading,
    error,
    fetchKeys,
    createOpen,
    setCreateOpen,
    editOpen,
    setEditOpen,
    deleteId,
    setDeleteId,
    newName,
    setNewName,
    newKeyType,
    setNewKeyType,
    newKeyValue,
    setNewKeyValue,
    editingKey,
    setEditingKey,
    editName,
    setEditName,
    createdKeyReveal,
    setCreatedKeyReveal,
    copiedId,
    revealedId,
    setRevealedId,
    handleCreate,
    handleEdit,
    handleDelete,
    openCreate,
    openEdit,
    copyToClipboard,
  };
}
