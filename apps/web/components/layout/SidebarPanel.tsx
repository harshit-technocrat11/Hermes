"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_NAVIGATION } from "../../config/navigation";

interface SidebarPanelProps {
  workspaceSlug: string;
  activeSection: string;
}

export function SidebarPanel({
  workspaceSlug,
  activeSection,
}: SidebarPanelProps) {
  const pathname = usePathname();
  const sections = SIDEBAR_NAVIGATION[activeSection] || [];

  const isActive = (href: string) => {
    return pathname.endsWith(href) || pathname.includes(href);
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 overflow-y-auto fixed left-16 h-full">
      <div className="p-4 space-y-6">
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-3">
              {section.title}
            </h3>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={`/${workspaceSlug}/${item.href}`}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                      active
                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                        : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-100"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
