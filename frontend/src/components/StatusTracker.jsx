function StatusTracker() {
  return (
    <div className="mt-8 bg-slate-900 rounded-3xl p-8 text-center">

      <div className="animate-pulse">

        <h2 className="text-2xl font-bold">
          Processing Video...
        </h2>

        <div className="mt-6 space-y-3 text-slate-400">
          <p>🎧 Downloading Audio</p>
          <p>📝 Generating Transcript</p>
          <p>📋 Creating Summary</p>
          <p>🧠 Building RAG Engine</p>
        </div>

      </div>

    </div>
  );
}

export default StatusTracker;