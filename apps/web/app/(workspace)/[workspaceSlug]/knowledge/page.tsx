import { Plus, Search, BookOpen, Clock, Star } from "lucide-react";

export default function KnowledgePage() {
  const documents = [
    {
      id: 1,
      title: "Product Roadmap",
      description: "Q3 and Q4 roadmap for all product lines",
      author: "Sarah Chen",
      category: "Product",
      updated: "2 days ago",
      starred: true,
    },
    {
      id: 2,
      title: "Brand Guidelines",
      description: "Updated brand identity and design tokens",
      author: "Sarah Chen",
      category: "Design",
      updated: "1 week ago",
      starred: false,
    },
    {
      id: 3,
      title: "Engineering Best Practices",
      description: "Code standards, testing, and deployment guides",
      author: "Alex Rivera",
      category: "Engineering",
      updated: "3 weeks ago",
      starred: true,
    },
    {
      id: 4,
      title: "Company Values",
      description: "Our mission, vision, and core values",
      author: "Alex Rivera",
      category: "Company",
      updated: "1 month ago",
      starred: false,
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Product":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "Design":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "Engineering":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "Company":
        return "bg-orange-500/10 text-orange-400 border-orange-500/30";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Knowledge</h1>
          <p className="text-slate-400">
            Centralized documentation and resources
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200">
          <Plus className="w-5 h-5" />
          New Document
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1 flex items-center gap-3 bg-slate-800 rounded-lg px-4 py-3 border border-slate-700 focus-within:border-blue-500 transition-all duration-200 max-w-sm">
          <Search className="w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search documents..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 outline-none"
          />
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-all duration-200 overflow-hidden hover:shadow-lg"
          >
            <div className="p-6">
              {/* Document Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <BookOpen className="w-6 h-6 text-slate-500 flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-100 mb-1 truncate">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2">
                      {doc.description}
                    </p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-yellow-400 transition-all duration-200 flex-shrink-0">
                  <Star
                    className="w-5 h-5"
                    fill={doc.starred ? "currentColor" : "none"}
                  />
                </button>
              </div>

              {/* Category and Author */}
              <div className="mb-4 pt-4 border-t border-slate-700">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
                      doc.category,
                    )}`}
                  >
                    {doc.category}
                  </span>
                  <span className="text-xs text-slate-400">{doc.author}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-4 h-4" />
                  Updated {doc.updated}
                </div>
                <button className="text-xs text-blue-400 hover:text-blue-300 transition-all duration-200">
                  View →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
