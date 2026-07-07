import { useState, useEffect, useCallback } from "react";
import { api } from "../lib/auth";

export interface WorkspaceItem {
  id: string;
  name: string;
  slug: string;
  iconUrl: string | null;
  inviteCode: string;
  createdAt: string;
  updatedAt: string;
  role: "OWNER" | "ADMIN" | "MEMBER" | "GUEST";
  memberCount: number;
}

interface UseWorkspacesResult {
  workspaces: WorkspaceItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useWorkspaces(): UseWorkspacesResult {
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkspaces = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/v1/workspaces");
      setWorkspaces(res.data ?? []);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load workspaces");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  return { workspaces, isLoading, error, refetch: fetchWorkspaces };
}
