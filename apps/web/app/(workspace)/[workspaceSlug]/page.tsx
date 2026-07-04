"use client";

import { useAuth } from "../../../hooks/use-auth";
import { Calendar, AlertCircle, TrendingUp, Users } from "lucide-react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const firstName = user?.name ? user.name.split(" ")[0] : "";

  return (
    <div className="p-8 max-w-7xl">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">
          {isLoading ? "Good morning" : `Good morning, ${firstName || "User"}`}
        </h1>
        <p className="text-slate-400">
          Here's what's happening in your workspace today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm font-medium">Assigned Tasks</p>
            <AlertCircle className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-slate-100">12</p>
          <p className="text-xs text-slate-500 mt-2">+2 from last week</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm font-medium">
              Active Projects
            </p>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-slate-100">5</p>
          <p className="text-xs text-slate-500 mt-2">3 in progress</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm font-medium">Team Members</p>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-slate-100">8</p>
          <p className="text-xs text-slate-500 mt-2">Across 2 teams</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm font-medium">Meetings Today</p>
            <Calendar className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-slate-100">3</p>
          <p className="text-xs text-slate-500 mt-2">Next in 2 hours</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-100 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[
                {
                  user: "Sarah Chen",
                  action: "commented on",
                  item: "Design System v2.0",
                  time: "10 minutes ago",
                },
                {
                  user: "John Park",
                  action: "completed",
                  item: "Set up React Native boilerplate",
                  time: "1 hour ago",
                },
                {
                  user: "Harshit Mehta",
                  action: "assigned you to",
                  item: "Implement authentication flow",
                  time: "3 hours ago",
                },
                {
                  user: "Alex Rivera",
                  action: "moved",
                  item: "Update brand guidelines doc",
                  time: "to Review - 5 hours ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-4 border-b border-slate-700 last:border-0"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300">
                      <span className="font-semibold text-slate-100">
                        {activity.user}
                      </span>
                      {" " + activity.action + " "}
                      <span className="text-blue-400 font-medium">
                        {activity.item}
                      </span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Overview */}
        <div>
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-100 mb-4">
              Active Projects
            </h2>
            <div className="space-y-3">
              {[
                {
                  name: "Website Redesign",
                  progress: 65,
                  color: "bg-blue-500",
                },
                { name: "Mobile App MVP", progress: 32, color: "bg-green-500" },
                {
                  name: "Q3 Growth Campaign",
                  progress: 15,
                  color: "bg-orange-500",
                },
              ].map((project, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-slate-300 font-medium">
                      {project.name}
                    </p>
                    <span className="text-xs text-slate-400 font-semibold">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`${project.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
