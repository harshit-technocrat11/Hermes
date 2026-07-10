"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, HelpCircle, ChevronDown, Plus, Check, Loader2, Copy, LogOut } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { useWorkspaces } from "../../hooks/use-workspaces";
import { api } from "../../lib/auth";

interface WorkspaceHeaderProps {
  workspaceSlug: string;
  workspaceName?: string;
}

export function WorkspaceHeader({
  workspaceSlug,
  workspaceName = "Nexus",
}: WorkspaceHeaderProps) {
  const router = useRouter();
  const { workspaces, refetch } = useWorkspaces();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [joinErrorMsg, setJoinErrorMsg] = useState("");

  const activeWorkspace = workspaces.find((w) => w.slug === workspaceSlug);
  const currentWorkspaceName = activeWorkspace ? activeWorkspace.name : workspaceName;
  const workspaceInitials = currentWorkspaceName ? currentWorkspaceName.charAt(0).toUpperCase() : "N";

  const handleCopyInvite = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeaveWorkspace = async () => {
    if (!window.confirm(`Are you sure you want to leave ${currentWorkspaceName}?`)) return;
    try {
      setDropdownOpen(false);
      await api.delete(`/api/v1/workspaces/${workspaceSlug}/members/leave`);
      await refetch();
      router.push("/workspaces");
    } catch (err: any) {
      alert(err.response?.data?.error || err.message || "Failed to leave workspace. Owners cannot leave their own workspace.");
    }
  };

  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 fixed top-0 right-0 left-80 z-40">
      {/* Left Section - Workspace Selector Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-all duration-200"
        >
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
            {workspaceInitials}
          </div>
          <span className="text-sm font-semibold text-slate-100 max-w-[150px] truncate">
            {currentWorkspaceName}
          </span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>

        {dropdownOpen && (
          <>
            {/* Backdrop to close dropdown on click outside */}
            <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
            
            <div className="absolute left-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50 p-2 space-y-1">
              <div className="px-3 py-1.5 border-b border-slate-700/50 pb-2 mb-1">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Active Workspace
                </div>
                <div className="text-sm font-bold text-slate-100 mt-1 truncate">
                  {currentWorkspaceName}
                </div>
                {activeWorkspace?.inviteCode && (
                  <div className="flex items-center justify-between bg-slate-900 border border-slate-700 rounded px-2 py-1 mt-1.5 text-xs text-slate-400">
                    <span className="font-mono">Code: {activeWorkspace.inviteCode}</span>
                    <button
                      onClick={() => handleCopyInvite(activeWorkspace.inviteCode)}
                      className="text-slate-500 hover:text-slate-300 transition-colors"
                      title="Copy invite code"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Workspaces
              </div>
              <div className="max-h-48 overflow-y-auto space-y-0.5">
                {workspaces.map((w) => {
                  const isActive = w.slug === workspaceSlug;
                  return (
                    <button
                      key={w.id}
                      onClick={() => {
                        setDropdownOpen(false);
                        router.push(`/${w.slug}/dashboard`);
                      }}
                      className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                          : "text-slate-300 hover:bg-slate-700/50 hover:text-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-5 h-5 bg-slate-700 rounded flex items-center justify-center text-xs font-bold text-slate-300">
                          {w.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="truncate">{w.name}</span>
                      </div>
                      {isActive && <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-slate-700/50 mt-1 pt-1 space-y-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    setModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 w-full text-sm text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all duration-200"
                >
                  <Plus className="w-4 h-4 text-slate-400" />
                  Create Workspace
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    setJoinModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 w-full text-sm text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all duration-200 font-semibold"
                >
                  <Plus className="w-4 h-4 text-slate-400 rotate-45" />
                  Join Workspace
                </button>
                <button
                  onClick={handleLeaveWorkspace}
                  className="flex items-center gap-2 px-3 py-2 w-full text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-all duration-200 font-semibold mt-1"
                >
                  <LogOut className="w-4 h-4" />
                  Leave Workspace
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2 w-48">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none w-full"
          />
          <kbd className="text-xs text-slate-500 font-mono">⌘K</kbd>
        </div>

        {/* Notification Button */}
        <button className="relative p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-all duration-200">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Help Button */}
        <button className="p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-all duration-200">
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* User Menu */}
        <UserMenu workspaceSlug={workspaceSlug} />
      </div>

      {/* Create Workspace Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100">Create New Workspace</h3>
              <p className="text-sm text-slate-400 mt-1">
                Create a workspace to collaborate with your team.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/50 border border-red-500/30 text-red-200 text-sm rounded-lg">
                {errorMsg}
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
                  setModalOpen(false);
                  setNewWorkspaceName("");
                  setErrorMsg("");
                }}
                disabled={isCreating}
                className="px-4 py-2 border border-slate-700 hover:bg-slate-800 text-sm font-semibold rounded-lg text-slate-300 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (newWorkspaceName.trim().length < 3) {
                    setErrorMsg("Workspace name must be at least 3 characters.");
                    return;
                  }
                  setIsCreating(true);
                  setErrorMsg("");
                  try {
                    const res = await api.post("/api/v1/workspaces", {
                      name: newWorkspaceName.trim(),
                    });
                    // On success, refetch workspaces list
                    await refetch();
                    setModalOpen(false);
                    setNewWorkspaceName("");
                    // Navigate to the newly created workspace
                    router.push(`/${res.data.slug}/dashboard`);
                  } catch (err: any) {
                    setErrorMsg(err.message || "Failed to create workspace.");
                  } finally {
                    setIsCreating(false);
                  }
                }}
                disabled={isCreating || newWorkspaceName.trim().length < 3}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-sm font-semibold rounded-lg text-white flex items-center gap-2 transition-all"
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
                className="px-4 py-2 border border-slate-700 hover:bg-slate-800 text-sm font-semibold rounded-lg text-slate-300 transition-all"
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
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-sm font-semibold rounded-lg text-white flex items-center gap-2 transition-all"
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
    </header>
  );
}
