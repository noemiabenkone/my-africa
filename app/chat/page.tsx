"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const country = searchParams.get("country");

  type Message = {
    role: "user" | "assistant";
    content: string;
  };

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false); 

  
  async function handleSend() {
    if (!question.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: question,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.text,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erro ao buscar resposta:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className="w-full max-w-sm h-[80vh] p-6 rounded-lg bg-white shadow-md flex flex-col m-6">
        <header className="p-4 border-b border-red-700">
          <h1 className="text-lg font-semibold text-red-800">
            Falar sobre {country}
          </h1>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.role === "user"
                  ? "bg-red-800 self-end text-white"
                  : "bg-transparent border border-red-700 self-start text-red-900"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && <span className="text-xs text-red-400">Digitando...</span>}
        </div>

        <div className="p-4 border-t border-red-700 flex gap-2">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
            placeholder="Digite sua pergunta..."
            className="flex-1 p-2 rounded-lg bg-white border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 text-red-900"
          />

          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-red-800 hover:bg-red-700 disabled:bg-red-300 px-4 rounded-lg text-white transition-colors"
          >
            {isLoading ? "..." : "Enviar"}
          </button>
        </div>
      </div>
    </main>
  );
}