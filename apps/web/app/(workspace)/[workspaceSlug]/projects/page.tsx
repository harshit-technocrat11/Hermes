import { Filter, Plus } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      description: "Rebuild the marketing site with the new brand and CMS.",
      status: "ACTIVE",
      progress: 65,
      members: 3,
      tasks: 18,
    },
    {
      id: 2,
      name: "Mobile App MVP",
      description: "Ship the first iOS and Android release of the Nexus app.",
      status: "ACTIVE",
      progress: 32,
      members: 4,
      tasks: 24,
    },
    {
      id: 3,
      name: "Q3 Growth Campaign",
      description:
        "Coordinate the cross-channel launch for the new pricing tier.",
      status: "PLANNING",
      progress: 15,
      members: 5,
      tasks: 9,
    },
    {
      id: 4,
      name: "Auth & Permissions",
      description: "Role-based access control and SSO across the platform.",
      status: "PAUSED",
      progress: 48,
      members: 2,
      tasks: 12,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "PLANNING":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "PAUSED":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Projects</h1>
          <p className="text-slate-400">
            Manage and track all your workspace projects
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200">
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      {/* Filter Bar */}
      <div className="mb-6 flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-all duration-200">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-all duration-200 overflow-hidden hover:shadow-lg"
          >
            <div className="p-6">
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-100 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {project.description}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                    project.status,
                  )}`}
                >
                  {project.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-medium">
                    Progress
                  </span>
                  <span className="text-xs text-slate-400 font-bold">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Project Stats */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {Array.from({ length: Math.min(project.members, 3) }).map(
                      (_, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border border-slate-700 flex items-center justify-center text-xs text-white font-bold"
                        >
                          {i + 1}
                        </div>
                      ),
                    )}
                  </div>
                  <span className="text-xs text-slate-400">
                    {project.members} members
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  {project.tasks} tasks
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
