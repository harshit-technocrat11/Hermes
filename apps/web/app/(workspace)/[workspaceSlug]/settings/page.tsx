import { Settings, Users, Lock, CreditCard, Bell } from "lucide-react";

export default function SettingsPage() {
  const settingsSections = [
    {
      title: "Workspace Settings",
      icon: Settings,
      items: [
        { label: "General", description: "Workspace name, URL, and branding" },
        { label: "Members", description: "Invite and manage team members" },
        { label: "Permissions", description: "Roles and access control" },
      ],
    },
    {
      title: "Integrations",
      icon: Users,
      items: [
        {
          label: "API Keys",
          description: "Manage API access and integrations",
        },
        { label: "OAuth", description: "Third-party authentication" },
        { label: "Webhooks", description: "Event notifications" },
      ],
    },
    {
      title: "Security",
      icon: Lock,
      items: [
        {
          label: "Security",
          description: "Password and two-factor authentication",
        },
        { label: "Sessions", description: "Active sessions and devices" },
        { label: "Audit Log", description: "View workspace activity" },
      ],
    },
    {
      title: "Billing",
      icon: CreditCard,
      items: [
        { label: "Billing", description: "Subscription and payment methods" },
        { label: "Invoices", description: "Download past invoices" },
        { label: "Usage", description: "Track usage and quotas" },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { label: "Email", description: "Email notification preferences" },
        { label: "Slack", description: "Slack integration and alerts" },
        { label: "Frequency", description: "Digest and batching settings" },
      ],
    },
  ];

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Settings</h1>
        <p className="text-slate-400">
          Manage your workspace preferences and integrations
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingsSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <div
              key={sectionIndex}
              className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:border-slate-600 transition-all duration-200"
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 px-6 py-4 bg-slate-900/50 border-b border-slate-700">
                <Icon className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-slate-100">
                  {section.title}
                </h2>
              </div>

              {/* Section Items */}
              <div className="divide-y divide-slate-700">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className="w-full flex items-start justify-between px-6 py-4 hover:bg-slate-700/30 transition-all duration-200 text-left group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-100 group-hover:text-slate-50">
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="ml-4 text-slate-400 group-hover:text-slate-300 transition-all duration-200">
                      →
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Danger Zone */}
      <div className="mt-8 bg-red-500/10 border border-red-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h3>
        <p className="text-sm text-slate-400 mb-4">
          Irreversible actions that require caution
        </p>
        <button className="px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-sm font-medium transition-all duration-200">
          Delete Workspace
        </button>
      </div>
    </div>
  );
}
