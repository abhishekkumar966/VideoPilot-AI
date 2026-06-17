function SummaryCard({ summary }) {
  const lines = summary?.split("\n").filter(Boolean);

  return (
    <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden">

      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center text-2xl">
          📋
        </div>

        <div>
          <h3 className="text-xl font-bold text-white">
            AI Summary
          </h3>

          <p className="text-sm text-slate-400">
            Generated from transcript
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">

        {lines.map((line, index) => {
          const isHeading =
            !line.startsWith("•") &&
            line === line.toUpperCase();

          const isSubHeading =
            !line.startsWith("•") &&
            !isHeading;

          if (isHeading) {
            return (
              <div
                key={index}
                className="text-violet-400 text-lg font-bold uppercase tracking-wider"
              >
                {line}
              </div>
            );
          }

          if (isSubHeading) {
            return (
              <div
                key={index}
                className="text-cyan-400 text-base font-semibold mt-4"
              >
                {line}
              </div>
            );
          }

          return (
            <div
              key={index}
              className="flex items-start gap-3 bg-slate-800/40 border border-slate-700 rounded-xl p-3"
            >
              <span className="text-green-400 mt-1">✓</span>

              <span className="text-slate-300">
                {line.replace("•", "")}
              </span>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default SummaryCard;