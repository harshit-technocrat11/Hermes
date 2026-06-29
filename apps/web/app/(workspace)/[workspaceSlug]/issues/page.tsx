import { LayoutGrid } from "lucide-react";

export default function Page() {
  return (
    <div className="p-8 flex items-center justify-center min-h-full">
      <div className="text-center">
        <LayoutGrid className="w-16 h-16 text-slate-600 mx-auto mb-4 opacity-50" />
        <h1 className="text-2xl font-bold text-slate-100 mb-2">
          Page not found
        </h1>
        <p className="text-slate-400">This page hasn't been set up yet.</p>
      </div>
    </div>
  );
}
