import { useState } from "react";
import api from "../service/api";

import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
import StatusTracker from "../components/StatusTracker";
import SummaryCard from "../components/SummaryCard";
import TranscriptCard from "../components/TranscriptCard";
import ActionItemsCard from "../components/ActionItemsCard";
import DecisionsCard from "../components/DecisionsCard";
import QuestionsCard from "../components/QuestionsCard";
import ChatBox from "../components/ChatBox";
import EmptyState from "../components/EmptyState";

function Home() {
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("english");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState({
  audio: false,
  transcription: false,
  title: false,
  summary: false,
  extraction: false,
  rag: false,
});

const handleAnalyze = async () => {
  if (!url.trim()) {
    alert("Please enter a YouTube URL");
    return;
  }

  try {
    setLoading(true);
    setResult(null);

    setStatus({
      audio: false,
      transcription: false,
      title: false,
      summary: false,
      extraction: false,
      rag: false,
    });

    setStatus((s) => ({ ...s, audio: true }));

    setTimeout(() => {
      setStatus((s) => ({ ...s, transcription: true }));
    }, 1000);

    setTimeout(() => {
      setStatus((s) => ({ ...s, title: true }));
    }, 2000);

    setTimeout(() => {
      setStatus((s) => ({ ...s, summary: true }));
    }, 3000);

    setTimeout(() => {
      setStatus((s) => ({ ...s, extraction: true }));
    }, 4000);

    const response = await api.post("/analyze", {
      source: url,
      language,
    });
 console.log("Analysis response:", response.data);
    setStatus((s) => ({
      ...s,
      rag: true,
    }));

    setResult(response.data.data || response.data);

  } catch (error) {
    console.error(error);
    alert("Analysis failed");
    console.log(error);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
  <Sidebar status={status} />

      <main className="flex-1 p-6 lg:p-10">
        <Hero />

        {/* Input Section */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 mt-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* URL Input */}
            <input
              type="text"
              placeholder="Paste YouTube URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-4 py-4 rounded-xl bg-slate-800 border border-slate-700 outline-none"
            />

            {/* Language Dropdown */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-4 rounded-xl bg-slate-800 border border-slate-700 outline-none text-white min-w-[180px]"
            >
              <option value="english">English</option>
              <option value="hinglish">Hinglish</option>
            </select>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="px-8 py-4 bg-violet-600 hover:bg-violet-700 rounded-xl font-semibold transition"
            >
              {loading ? "Analyzing..." : "Analyze Video"}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && <StatusTracker />}

        {/* Empty State */}
        {!loading && !result && <EmptyState />}

        {/* Results */}
        {result && (
          <div className="mt-10 space-y-6">
            {/* Title */}
            <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl">
              <h2 className="text-3xl font-bold">
                {result.title}
              </h2>
            </div>

            {/* Summary + Transcript */}
            <div className="grid lg:grid-cols-2 gap-6">
              <SummaryCard summary={result.summary} />
              <TranscriptCard transcript={result.transcript} />
            </div>

            {/* Analysis Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <ActionItemsCard items={result.action_items} />
              <DecisionsCard decisions={result.key_decisions} />
              <QuestionsCard questions={result.open_questions} />
            </div>

            {/* Chat */}
            <ChatBox />
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;