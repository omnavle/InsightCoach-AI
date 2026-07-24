import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { ChatMessage } from "../types";
import { sendChatMessage } from "../services/api";
import LoadingSkeleton from "./LoadingSkeleton";

interface ChatPanelProps {
  datasetId: number;
  messages: ChatMessage[];
  onMessagesChange: (messages: ChatMessage[]) => void;
}

const SUGGESTED_PROMPTS = [
  "Explain this dataset.",
  "Which algorithm should I use?",
  "Which feature is the target?",
  "Explain this like I'm new to machine learning.",
  "What should I learn next?",
];

export default function ChatPanel({ datasetId, messages, onMessagesChange }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content) return;

    const userMessage: ChatMessage = { role: "user", content };
    const updated = [...messages, userMessage];
    onMessagesChange(updated);
    setInput("");
    setIsSending(true);

    try {
      const reply = await sendChatMessage(datasetId, content, updated);
      onMessagesChange([...updated, { role: "assistant", content: reply }]);
    } catch {
      onMessagesChange([
        ...updated,
        { role: "assistant", content: "That request failed. Try asking again." },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div>
      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {SUGGESTED_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => handleSend(p)}
              className="border border-line px-3 py-1.5 text-xs font-mono text-ink-700 hover:border-pine-500 hover:text-pine-600 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-3 max-h-96 overflow-y-auto mb-4 pr-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`px-4 py-3 text-sm leading-relaxed border ${
              m.role === "user"
                ? "bg-pine-50 border-pine-100 text-ink-900 ml-8"
                : "bg-card border-line text-ink-700 mr-8"
            }`}
          >
            <p className="eyebrow mb-1">{m.role === "user" ? "you" : "mentor"}</p>
            <ReactMarkdown>{m.content}</ReactMarkdown>
          </div>
        ))}
        {isSending && (
          <div className="border border-line px-4 py-3 mr-8">
            <LoadingSkeleton lines={2} />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about this dataset…"
          className="flex-1 border border-line bg-card px-3 py-2 text-sm font-mono focus:outline-none focus:border-pine-500"
        />
        <button className="btn-primary" onClick={() => handleSend()} disabled={isSending}>
          Send
        </button>
      </div>
    </div>
  );
}
