function Sidebar({ status }) {
  const steps = [
    { key: "audio", label: "Audio Processing" },
    { key: "transcription", label: "Transcription" },
    { key: "title", label: "Title Generation" },
    { key: "summary", label: "Summarization" },
    { key: "extraction", label: "Extraction" },
    { key: "rag", label: "RAG Engine" },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-950 border-r border-slate-800 p-6">

      <h1 className="text-3xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
        VideoPilot AI
      </h1>

      <p className="text-slate-500 text-sm mt-2">
        Meeting Intelligence
      </p>

      <div className="mt-10">
        <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-4">
          Pipeline Status
        </h3>

        {steps.map((step) => (
          <div
            key={step.key}
            className="mb-3 p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center"
          >
            <span>{step.label}</span>

            {status?.[step.key] ? (
              <span className="text-green-400">✅</span>
            ) : (
              <span className="text-yellow-400">⏳</span>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;