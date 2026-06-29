"use client";

import { ReactNode } from "react";
import { SidebarRail } from "./SidebarRail";
import { SidebarPanel } from "./SidebarPanel";
import { WorkspaceHeader } from "./WorkspaceHeader";

interface AppShellProps {
  children: ReactNode;
  workspaceSlug: string;
  activeSection: string;
  workspaceName?: string;
}

export function AppShell({
  children,
  workspaceSlug,
  activeSection,
  workspaceName,
}: AppShellProps) {
  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar Rail - Fixed */}
      <SidebarRail workspaceSlug={workspaceSlug} />

      {/* Sidebar Panel - Fixed */}
      <SidebarPanel
        workspaceSlug={workspaceSlug}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-80">
        {/* Header - Fixed */}
        <WorkspaceHeader
          workspaceSlug={workspaceSlug}
          workspaceName={workspaceName}
        />

        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-auto pt-14">
          <div className="min-h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
