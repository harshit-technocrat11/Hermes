import { Send, Paperclip, Smile } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Channel Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-100"># General</h1>
          <p className="text-xs text-slate-400 mt-1">
            Company-wide announcements and chat
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-sm rounded-lg text-slate-300 hover:bg-slate-700 transition-all duration-200">
            Info
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircleIcon className="w-8 h-8 text-slate-500" />
          </div>
          <h2 className="text-xl font-semibold text-slate-100 mb-2">
            This is the beginning of #general
          </h2>
          <p className="text-slate-400 max-w-md">
            Welcome! This is where team conversations happen. Share updates, ask
            questions, and collaborate with your team.
          </p>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-slate-800 border-t border-slate-700 px-8 py-4">
        <div className="flex items-end gap-3">
          <div className="flex-1 bg-slate-700 rounded-lg border border-slate-600 focus-within:border-blue-500 transition-all duration-200 flex items-end gap-2 px-4 py-3">
            <button className="text-slate-400 hover:text-slate-300 transition-all duration-200">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Message #general..."
              disabled
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 outline-none disabled:cursor-not-allowed"
            />
            <button className="text-slate-400 hover:text-slate-300 transition-all duration-200">
              <Smile className="w-5 h-5" />
            </button>
          </div>
          <button
            disabled
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
}
