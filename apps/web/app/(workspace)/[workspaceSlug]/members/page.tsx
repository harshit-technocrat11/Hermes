"use client";

import { use } from "react";
import { Search } from "lucide-react";
import { useWorkspaceMembers, useMyMembership } from "../../../../hooks/use-members";


export default function MembersPage({ params }: { params: Promise<{ workspaceSlug: string }> }) {
  const { workspaceSlug } = use(params);
  
  const { members, isLoading } = useWorkspaceMembers(workspaceSlug);
  const { membership } = useMyMembership(workspaceSlug);

  const getRoleColor = (role: string) => {
    if (role === "OWNER") return "text-purple-400";
    if (role === "ADMIN") return "text-blue-400";
    if (role === "MEMBER") return "text-slate-400";
    return "text-slate-400";
  };

  const formatJoinedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const diffMs = Date.now() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return "Joined today";
      if (diffDays === 1) return "Joined yesterday";
      if (diffDays < 30) return `Joined ${diffDays} days ago`;
      if (diffDays < 365) return `Joined ${Math.floor(diffDays / 30)} months ago`;
      return `Joined ${Math.floor(diffDays / 365)} years ago`;
    } catch {
      return "Joined recently";
    }
  };

  if (isLoading) {
    return <div className="p-8 max-w-7xl text-slate-400">Loading members...</div>;
  }

  const isOnlyMember = members.length === 1;

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Members</h1>
          <p className="text-slate-400">{members.length} total members in your workspace</p>
        </div>
      </div>

      {/* Empty State / Only Member */}
      {isOnlyMember && (
        <div className="mb-6 bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg text-blue-200">
          <p>Only you are in this workspace.</p>
          <p className="text-sm opacity-80 mt-1">Invite teammates using your workspace invite code.</p>
        </div>
      )}

      {/* Members List */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-900/50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Joined
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                key={member.id}
                className="border-b border-slate-700 hover:bg-slate-700/30 transition-all duration-200 last:border-0"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full" />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-100 flex items-center gap-2">
                        {member.name}
                        {membership?.userId === member.userId && (
                          <span className="text-xs bg-slate-700 px-2 py-0.5 rounded text-slate-300">You</span>
                        )}
                      </p>
                      <p className="text-xs text-slate-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-sm font-medium ${getRoleColor(member.role)}`}
                  >
                    {member.role === "OWNER" ? "Owner" : "Member"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-400">
                    {formatJoinedDate(member.joinedAt)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
