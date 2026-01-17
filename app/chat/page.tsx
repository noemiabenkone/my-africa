
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const country = searchParams.get("country");

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  function handleSend() {
    if (!question.trim()) return;

    setMessages((prev) => [...prev, question]);
    setQuestion("");
  }

  return (
    <main className="min-h-screen bg-red-900 flex justify-center pt-10">
      <div className="w-full max-w-xl h-[85vh] p-6 flex flex-col gap-4">
        
        <h1 className="text-2xl font-bold text-center text-white">
          Conversando sobre {country}
        </h1>

        <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="text-sm text-white"
            >
              {msg}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Digite sua pergunta..."
            className="flex-1 p-2 rounded outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-red-600 text-white px-4 rounded"
          >
            Perguntar
          </button>
        </div>

      </div>
    </main>
  );
}
