"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { RAIL_NAV_ITEMS } from "../../config/navigation";
import { Settings, ChevronDown, Plus, Check, Loader2, Copy, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../hooks/use-auth";
import { useWorkspaces } from "../../hooks/use-workspaces";
import { api } from "../../lib/auth";

interface SidebarRailProps {
  workspaceSlug: string;
}

export function SidebarRail({ workspaceSlug }: SidebarRailProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
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
  const workspaceName = activeWorkspace ? activeWorkspace.name : "Nexus";
  const workspaceInitials = workspaceName.charAt(0).toUpperCase();

  const handleCopyInvite = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isActive = (href: string) => {
    const basePath = `/${workspaceSlug}/${href}`;
    return pathname.startsWith(basePath);
  };

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <aside className="w-16 bg-slate-950 border-r border-slate-800 flex flex-col items-center py-4 gap-4 fixed h-full z-40">
      {/* Logo/Workspace Icon Button with Dropdown Selector */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200"
          title="Switch Workspace"
        >
          {workspaceInitials}
        </button>

        {dropdownOpen && (
          <>
            {/* Backdrop to close dropdown on click outside */}
            <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
            
            <div className="absolute left-12 top-0 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 p-2 space-y-2">
              <div className="px-3 py-1 border-b border-slate-800 pb-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Active Workspace
                </div>
                <div className="text-sm font-bold text-slate-100 mt-1 truncate">
                  {workspaceName}
                </div>
                {activeWorkspace?.inviteCode && (
                  <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded px-2 py-1 mt-1.5 text-xs text-slate-400">
                    <span className="font-mono">Code: {activeWorkspace.inviteCode}</span>
                    <button
                      onClick={() => handleCopyInvite(activeWorkspace.inviteCode)}
                      className="text-slate-500 hover:text-slate-300 transition-colors"
                      title="Copy invite code"
                    >
                      {copied ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="px-3 py-0.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Workspaces
              </div>
              <div className="max-h-48 overflow-y-auto space-y-0.5 px-1">
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
                          : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-5 h-5 bg-slate-800 rounded flex items-center justify-center text-xs font-bold text-slate-300">
                          {w.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="truncate">{w.name}</span>
                      </div>
                      {isActive && <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-slate-800 mt-1 pt-1 space-y-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    setModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 w-full text-sm text-slate-300 hover:bg-slate-800/50 rounded-lg transition-all duration-200 font-semibold"
                >
                  <Plus className="w-4 h-4 text-slate-400" />
                  Create Workspace
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    setJoinModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 w-full text-sm text-slate-300 hover:bg-slate-800/50 rounded-lg transition-all duration-200 font-semibold"
                >
                  <Plus className="w-4 h-4 text-slate-400 rotate-45" />
                  Join Workspace
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-3 flex-1">
        {RAIL_NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={`/${workspaceSlug}/${item.href}`}
              className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-300 hover:bg-slate-800"
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              {item.badge && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
              {/* Tooltip on hover */}
              <div className="absolute left-12 bg-slate-800 text-slate-100 px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="flex flex-col gap-3 border-t border-slate-800 pt-4">
        <Link
          href={`/${workspaceSlug}/settings`}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-300 hover:bg-slate-800 transition-all duration-200"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </Link>

        {/* User Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden">
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            userInitials
          )}
        </div>
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
    </aside>
  );
}
