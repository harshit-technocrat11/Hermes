"use client";

import { Search, Bell, HelpCircle } from "lucide-react";
import { UserMenu } from "./UserMenu";

interface WorkspaceHeaderProps {
  workspaceSlug: string;
  workspaceName?: string;
}

export function WorkspaceHeader({
  workspaceSlug,
  workspaceName = "Nexus",
}: WorkspaceHeaderProps) {
  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 fixed top-0 right-0 left-80 z-40">
      {/* Left Section - Workspace Info */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
          N
        </div>
        <h1 className="text-sm font-semibold text-slate-100">
          {workspaceName}
        </h1>
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
    </header>
  );
}
