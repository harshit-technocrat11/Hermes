export default function WorkspacesPage() {
  return (
    <div className="p-8 flex items-center justify-center min-h-screen bg-slate-900">
      <div className="text-center bg-slate-800 p-8 rounded-lg border border-slate-700 max-w-md w-full shadow-lg">
        <h1 className="text-2xl font-bold text-slate-100 mb-4">Workspace Selection</h1>
        <p className="text-slate-400 mb-6">Select a workspace from your account to continue.</p>
        <div className="animate-pulse h-10 bg-slate-700 rounded-md"></div>
      </div>
    </div>
  );
}