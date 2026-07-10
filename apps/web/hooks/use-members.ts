import { useState, useEffect, useCallback } from "react";
import { api } from "../lib/auth";

export interface WorkspaceMember {
  id: string; // The user ID
  userId: string;
  name: string;
  email: string;
  image: string | null;
  role: "OWNER" | "ADMIN" | "MEMBER" | "GUEST";
  joinedAt: string;
}

export function useWorkspaceMembers(workspaceSlug: string) {
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    if (!workspaceSlug) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get(`/api/v1/workspaces/${workspaceSlug}/members`);
      setMembers(res.data ?? []);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load members");
    } finally {
      setIsLoading(false);
    }
  }, [workspaceSlug]);

  const removeMember = useCallback(
    async (memberId: string) => {
      if (!workspaceSlug) throw new Error("Workspace slug is required");

      await api.delete(
        `/api/v1/workspaces/${workspaceSlug}/members/${memberId}`,
      );
      await fetchMembers();
    },
    [fetchMembers, workspaceSlug],
  );

  const leaveWorkspace = useCallback(async () => {
    if (!workspaceSlug) throw new Error("Workspace slug is required");

    await api.delete(`/api/v1/workspaces/${workspaceSlug}/members/leave`);
    await fetchMembers();
  }, [fetchMembers, workspaceSlug]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return {
    members,
    isLoading,
    error,
    refetch: fetchMembers,
    removeMember,
    leaveWorkspace,
  };
}

export function useMyMembership(workspaceSlug: string) {
  const [membership, setMembership] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMembership = useCallback(async () => {
    if (!workspaceSlug) return;
    setIsLoading(true);
    try {
      const res = await api.get(
        `/api/v1/workspaces/${workspaceSlug}/members/me`,
      );
      setMembership(res.data ?? null);
    } catch (err: any) {
      // Ignore errors for this
      setMembership(null);
    } finally {
      setIsLoading(false);
    }
  }, [workspaceSlug]);

  useEffect(() => {
    fetchMembership();
  }, [fetchMembership]);

  return { membership, isLoading };
}
