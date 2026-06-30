import { Plus, Search, Shield } from "lucide-react";

export default function MembersPage() {
  const members = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Founding Engineer",
      email: "alex@nexus.so",
      status: "Online",
      avatar: "AR",
      lastActive: "less than a minute ago",
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Product Designer",
      email: "sarah@nexus.so",
      status: "Online",
      avatar: "SC",
      lastActive: "4 minutes ago",
    },
    {
      id: 3,
      name: "Harshit Mehta",
      role: "Product Manager",
      email: "harshit@nexus.so",
      status: "Idle",
      avatar: "HM",
      lastActive: "26 minutes ago",
    },
    {
      id: 4,
      name: "Ashutosh Verma",
      role: "Backend Engineer",
      email: "ashutosh@nexus.so",
      status: "Offline",
      avatar: "AV",
      lastActive: "about 2 hours ago",
    },
    {
      id: 5,
      name: "John Park",
      role: "Frontend Engineer",
      email: "john@nexus.so",
      status: "Online",
      avatar: "JP",
      lastActive: "12 minutes ago",
    },
    {
      id: 6,
      name: "Emma Wilson",
      role: "Growth Marketer",
      email: "emma@nexus.so",
      status: "Offline",
      avatar: "EW",
      lastActive: "about 20 hours ago",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online":
        return "bg-green-500";
      case "Idle":
        return "bg-yellow-500";
      default:
        return "bg-slate-500";
    }
  };

  const getRoleColor = (role: string) => {
    if (role.includes("Engineer")) return "text-blue-400";
    if (role.includes("Designer")) return "text-purple-400";
    if (role.includes("Manager")) return "text-green-400";
    return "text-slate-400";
  };

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Members</h1>
          <p className="text-slate-400">6 total members in your workspace</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200">
          <Plus className="w-5 h-5" />
          Invite Member
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-3 bg-slate-800 rounded-lg px-4 py-3 border border-slate-700 focus-within:border-blue-500 transition-all duration-200 max-w-sm">
        <Search className="w-5 h-5 text-slate-500" />
        <input
          type="text"
          placeholder="Search members..."
          className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 outline-none"
        />
      </div>

      {/* Members Table */}
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
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Actions
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
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {member.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-100">
                        {member.name}
                      </p>
                      <p className="text-xs text-slate-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-sm font-medium ${getRoleColor(member.role)}`}
                  >
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`}
                    ></div>
                    <span className="text-sm text-slate-300">
                      {member.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-400">
                    {member.lastActive}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all duration-200">
                    <Shield className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
