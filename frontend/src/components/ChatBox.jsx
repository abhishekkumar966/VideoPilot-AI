import { useState, useRef, useEffect } from "react";
import api from "../service/api";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");

    try {
      setLoading(true);

      const res = await api.post("/chat", {
        question: userQuestion,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            res.data.answer ||
            res.data.response ||
            "No answer found.",
        },
      ]);
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ Failed to get response.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">
          💬 Chat With Video
        </h3>

        <button
          onClick={() => setMessages([])}
          className="text-sm px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600"
        >
          Clear
        </button>
      </div>

      <div className="h-96 overflow-y-auto space-y-4 mb-6 pr-2">
        {messages.map((msg, index) => (
          <div key={index}>
            <div
              className={`text-xs mb-1 ${
                msg.role === "user"
                  ? "text-violet-300 text-right"
                  : "text-cyan-300"
              }`}
            >
              {msg.role === "user"
                ? "You"
                : "AI Assistant"}
            </div>

            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === "user"
                  ? "ml-auto bg-gradient-to-r from-violet-600 to-purple-500"
                  : "bg-slate-800 border border-slate-700"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="max-w-[80%] p-4 rounded-2xl bg-slate-800 border border-slate-700">
            🤖 Thinking...
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      <div className="flex gap-4">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askQuestion();
            }
          }}
          placeholder="Ask anything about this video..."
          className="flex-1 px-4 py-3 bg-slate-800 rounded-xl border border-slate-700 outline-none"
        />

        <button
          onClick={askQuestion}
          disabled={loading}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl transition"
        >
          {loading ? "..." : "Ask"}
        </button>
      </div>
    </div>
  );
}

export default ChatBox;