"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { RAIL_NAV_ITEMS } from "@/config/navigation";
import { RAIL_NAV_ITEMS } from "../../config/navigation";
import { Settings } from "lucide-react";

interface SidebarRailProps {
  workspaceSlug: string;
}

export function SidebarRail({ workspaceSlug }: SidebarRailProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    const basePath = `/${workspaceSlug}/${href}`;
    return pathname.startsWith(basePath);
  };

  return (
    <aside className="w-16 bg-slate-950 border-r border-slate-800 flex flex-col items-center py-4 gap-4 fixed h-full">
      {/* Logo/Workspace Icon */}
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
        N
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
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:shadow-lg transition-all duration-200">
          A
        </div>
      </div>
    </aside>
  );
}
