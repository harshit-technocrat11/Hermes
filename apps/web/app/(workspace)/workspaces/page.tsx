"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkspaces } from "../../../hooks/use-workspaces";
import { useAuth } from "../../../hooks/use-auth";
import { api } from "../../../lib/auth";
import { Plus, ArrowRight, Loader2, LogOut, LayoutGrid, AlertCircle } from "lucide-react";

export default function WorkspacesPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { workspaces, isLoading, error, refetch } = useWorkspaces();

  // Create workspace modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createErrorMsg, setCreateErrorMsg] = useState("");

  // Join workspace modal states
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [joinErrorMsg, setJoinErrorMsg] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#090d16] text-slate-400 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-2" />
        <span>Loading workspaces...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,#1e1b4b_0%,#090d16_70%)] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
              H
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-50">Workspaces</h1>
              <p className="text-xs text-slate-400">Signed in as {user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-950/50 border border-red-500/30 text-red-200 text-sm rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Workspace List / Empty State */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Your Workspaces
          </h2>

          {workspaces.length === 0 ? (
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
                <LayoutGrid className="w-6 h-6 text-slate-500" />
              </div>
              <div>
                <h3 className="text-slate-200 font-bold">No workspaces found</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  To get started, create a new workspace or join an existing one using an invite code.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-1">
              {workspaces.map((w) => (
                <button
                  key={w.id}
                  onClick={() => router.push(`/${w.slug}/dashboard`)}
                  className="flex items-center justify-between w-full p-4 bg-slate-900/50 backdrop-blur-xl border border-white/5 hover:border-indigo-500/50 rounded-xl transition-all group text-left"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 text-indigo-400 border border-indigo-500/20 rounded-xl flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shrink-0">
                      {w.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-slate-100 font-bold group-hover:text-white transition-colors truncate">
                        {w.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-wide font-semibold">
                        Role: {w.role}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex-1 inline-flex items-center justify-center h-12 px-5 bg-white text-slate-900 border border-white/20 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(99,102,241,0.15)] active:translate-y-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Workspace
          </button>
          <button
            onClick={() => setJoinModalOpen(true)}
            className="flex-1 inline-flex items-center justify-center h-12 px-5 bg-transparent text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2 rotate-45" />
            Join Workspace
          </button>
        </div>
      </div>

      {/* Create Workspace Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100">Create New Workspace</h3>
              <p className="text-sm text-slate-400 mt-1">
                Create a workspace to collaborate with your team.
              </p>
            </div>

            {createErrorMsg && (
              <div className="p-3 bg-red-950/50 border border-red-500/30 text-red-200 text-sm rounded-lg">
                {createErrorMsg}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Workspace Name
              </label>
              <input
                type="text"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                placeholder="e.g. Acme Corporation"
                className="w-full h-10 px-3 bg-slate-950 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setCreateModalOpen(false);
                  setNewWorkspaceName("");
                  setCreateErrorMsg("");
                }}
                disabled={isCreating}
                className="px-4 py-2 border border-slate-700 hover:bg-slate-800 text-sm font-semibold rounded-lg text-slate-300 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (newWorkspaceName.trim().length < 3) {
                    setCreateErrorMsg("Workspace name must be at least 3 characters.");
                    return;
                  }
                  setIsCreating(true);
                  setCreateErrorMsg("");
                  try {
                    const res = await api.post("/api/v1/workspaces", {
                      name: newWorkspaceName.trim(),
                    });
                    await refetch();
                    setCreateModalOpen(false);
                    setNewWorkspaceName("");
                    router.push(`/${res.data.slug}/dashboard`);
                  } catch (err: any) {
                    setCreateErrorMsg(err.message || "Failed to create workspace.");
                  } finally {
                    setIsCreating(false);
                  }
                }}
                disabled={isCreating || newWorkspaceName.trim().length < 3}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-sm font-semibold rounded-lg text-white flex items-center gap-2 transition-all cursor-pointer"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Workspace"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Workspace Modal */}
      {joinModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100">Join Workspace</h3>
              <p className="text-sm text-slate-400 mt-1">
                Enter the 8-character invite code of the workspace you want to join.
              </p>
            </div>

            {joinErrorMsg && (
              <div className="p-3 bg-red-950/50 border border-red-500/30 text-red-200 text-sm rounded-lg">
                {joinErrorMsg}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Invite Code
              </label>
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())}
                placeholder="e.g. A1B2C3D4"
                maxLength={8}
                className="w-full h-10 px-3 bg-slate-950 border border-white/10 rounded-lg text-white font-mono text-sm tracking-widest focus:outline-none focus:border-blue-500 transition-colors"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setJoinModalOpen(false);
                  setInviteCode("");
                  setJoinErrorMsg("");
                }}
                disabled={isJoining}
                className="px-4 py-2 border border-slate-700 hover:bg-slate-800 text-sm font-semibold rounded-lg text-slate-300 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (inviteCode.trim().length !== 8) {
                    setJoinErrorMsg("Invite code must be exactly 8 characters.");
                    return;
                  }
                  setIsJoining(true);
                  setJoinErrorMsg("");
                  try {
                    const res = await api.post("/api/v1/workspaces/join", {
                      inviteCode: inviteCode.trim().toUpperCase(),
                    });
                    await refetch();
                    setJoinModalOpen(false);
                    setInviteCode("");
                    router.push(`/${res.data.slug}/dashboard`);
                  } catch (err: any) {
                    setJoinErrorMsg(err.message || "Failed to join workspace.");
                  } finally {
                    setIsJoining(false);
                  }
                }}
                disabled={isJoining || inviteCode.trim().length !== 8}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-sm font-semibold rounded-lg text-white flex items-center gap-2 transition-all cursor-pointer"
              >
                {isJoining ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Joining...
                  </>
                ) : (
                  "Join Workspace"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}