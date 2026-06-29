import { Archive, Trash2, Clock } from "lucide-react";

export default function InboxPage() {
  const messages = [
    {
      id: 1,
      sender: "Harshit Mehta",
      subject: "Task assigned: Implement authentication flow",
      preview:
        "I've assigned you NEX-102 to work on implementing the authentication flow for the web app.",
      time: "18 minutes ago",
      unread: true,
    },
    {
      id: 2,
      sender: "Sarah Chen",
      subject: "Design review: New landing page",
      preview:
        "Hey! The new landing page design is ready for review. Can you take a look and provide feedback?",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 3,
      sender: "John Park",
      subject: "PR Review: API refactoring",
      preview:
        "I've submitted a PR for the API refactoring. Would appreciate your feedback on the implementation.",
      time: "4 hours ago",
      unread: false,
    },
    {
      id: 4,
      sender: "Emma Wilson",
      subject: "Q3 Growth Campaign Update",
      preview:
        "Updated the campaign tracker with the latest metrics. Check it out when you get a chance!",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 5,
      sender: "Ashutosh Verma",
      subject: "Database migration complete",
      preview:
        "The database migration to the new schema has been completed successfully. All systems operational.",
      time: "2 days ago",
      unread: false,
    },
  ];

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Inbox</h1>
          <p className="text-slate-400">2 unread messages</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-sm rounded-lg text-slate-300 hover:bg-slate-800 transition-all duration-200">
            Mark all as read
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="divide-y divide-slate-700">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 hover:bg-slate-700/30 transition-all duration-200 cursor-pointer group ${
                message.unread
                  ? "bg-slate-700/30 border-l-4 border-l-blue-500"
                  : ""
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                  {message.sender.split(" ")[0][0]}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <p
                      className={`text-sm font-semibold truncate ${
                        message.unread ? "text-slate-100" : "text-slate-300"
                      }`}
                    >
                      {message.sender}
                    </p>
                    <span className="text-xs text-slate-500 flex-shrink-0 whitespace-nowrap">
                      {message.time}
                    </span>
                  </div>
                  <p
                    className={`text-sm mb-1 truncate ${
                      message.unread
                        ? "text-slate-200 font-medium"
                        : "text-slate-400"
                    }`}
                  >
                    {message.subject}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {message.preview}
                  </p>
                </div>

                {/* Actions (visible on hover) */}
                <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-700/50 rounded-lg transition-all duration-200">
                    <Archive className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-all duration-200">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty state placeholder */}
      <div className="mt-8 p-8 bg-slate-800/50 border border-slate-700 rounded-lg text-center">
        <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3 opacity-50" />
        <p className="text-slate-400">No archived messages</p>
      </div>
    </div>
  );
}
