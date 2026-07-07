"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useAuth } from "../../hooks/use-auth";

interface UserMenuProps {
  workspaceSlug: string;
}

export function UserMenu({ workspaceSlug }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-all duration-200"
      >
        <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded flex items-center justify-center text-white text-xs font-bold overflow-hidden">
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
        <span className="text-sm hidden sm:block">
          {user?.name || "Loading..."}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50">
          <div className="p-4 border-b border-slate-700">
            <p className="text-sm font-semibold text-slate-100">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user?.email || ""}
            </p>
          </div>

          <nav className="p-2 space-y-1">
            <Link
              href={`/${workspaceSlug}/settings/profile`}
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all duration-200"
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
            <Link
              href={`/${workspaceSlug}/settings`}
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all duration-200"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </nav>

          <div className="p-2 border-t border-slate-700">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2 w-full text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
