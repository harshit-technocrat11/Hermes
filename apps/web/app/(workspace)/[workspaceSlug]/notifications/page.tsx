import { Trash2, Check } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      user: "Harshit Mehta",
      action: "assigned you a task",
      item: "NEX-102: Implement authentication flow",
      time: "18 minutes ago",
      read: false,
      type: "assignment",
    },
    {
      id: 2,
      user: "Alex Rivera",
      action: "commented on",
      item: "NEX-104: LGTM, just one nil on the border token naming.",
      time: "about 10 hours ago",
      read: false,
      type: "comment",
    },
    {
      id: 3,
      user: "Ashutosh Verma",
      action: "mentioned you in",
      item: "#engineering: token refresh review",
      time: "about 5 hours ago",
      read: false,
      type: "mention",
    },
    {
      id: 4,
      user: "Emma Wilson",
      action: "updated",
      item: "Q3 Growth Campaign progress to 15%",
      time: "about 14 hours ago",
      read: true,
      type: "update",
    },
    {
      id: 5,
      user: "Sarah Chen",
      action: "invited you to",
      item: "Design space: priya@nexus.so joined",
      time: "1 day ago",
      read: true,
      type: "invitation",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "bg-blue-500/10 border-blue-500/30";
      case "comment":
        return "bg-purple-500/10 border-purple-500/30";
      case "mention":
        return "bg-orange-500/10 border-orange-500/30";
      case "update":
        return "bg-green-500/10 border-green-500/30";
      case "invitation":
        return "bg-pink-500/10 border-pink-500/30";
      default:
        return "bg-slate-500/10 border-slate-500/30";
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            Notifications
          </h1>
          <p className="text-slate-400">You have 3 unread notifications</p>
        </div>
        <button className="text-sm text-slate-400 hover:text-slate-300 transition-all duration-200">
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-lg ${
              notification.read
                ? "bg-slate-900/30 border-slate-700 hover:border-slate-600"
                : `bg-slate-800 border-slate-700 hover:border-slate-600 ${getTypeColor(
                    notification.type,
                  )} border-l-4`
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                {notification.user.charAt(0)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-slate-100">
                    {notification.user}
                  </span>
                  {" " + notification.action + " "}
                  <span className="text-blue-400 font-medium">
                    {notification.item}
                  </span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {notification.time}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {!notification.read && (
                  <button className="p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all duration-200">
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-all duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
