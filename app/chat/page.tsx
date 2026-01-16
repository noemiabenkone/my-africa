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
    <main className="min-h-screen bg-red-200 flex items-center justify-center">
      <div className="w-full max-w-sm p-6 bg-red-300 rounded-lg shadow-lg flex flex-col gap-4">
        
        
        <h1 className="text-2xl font-bold text-center">
          Conversando sobre {country}
        </h1>

        
        <div className="flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-white p-2 rounded text-sm"
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
