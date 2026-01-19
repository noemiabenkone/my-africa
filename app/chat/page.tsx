
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ChatPage() {

  function FakeIAResponse(question: string, country: string | null) {
    if(!country) return "não sei sobre esse pais !";

    const q = question.toLowerCase();
   
    if (!country) return "Não sei sobre esse país.";

    if (q.includes("língua")) {
    return `A língua oficial de ${country} é o português.`;
    }

    if (q.includes("capital")) {
    return `A capital de ${country} é Luanda.`;
    }

    if (q.includes("cultura")) {
    return `${country} tem uma cultura rica, com música, dança e tradições muito fortes.`;
    }

    if (q.includes("história")) {
    return `${country} tem uma história marcada por colonização e luta pela independência.`;
    }

    return `Como posso te ajudar com informações sobre a cultura, língua ou história de ${country}.`;
    
  }

  const searchParams = useSearchParams();
  const country = searchParams.get("country");

  type Message = {
    role: "user" | "assistant";
    content: string;
  }
  const [question, setQuestion] = useState("");
  const[messages, setMessages] = useState<Message[]>([]);
  

  async function handleSend() {
  if (!question.trim()) return;

  const userMessage: Message = {
    role: "user",
    content: question,
  };

  setMessages((prev) => [...prev, userMessage]);
  setQuestion("");

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      country,
    }),
  });

  const data = await response.json();

  const aiMessage: Message = {
    role: "assistant",
    content: data.answer,
  };

  setMessages((prev) => [...prev, aiMessage]);
}


  return (
    <main className="min-h-screen bg-red-50 flex items-center justify-center ">
      <div className=" w-full max-w-sm h-[80vh]  p-6 rounded-lg bg-white shadow-md flex flex-col m-6">
        <header className="p-4 border-b border-red-700">
          <h1 className="text-lg font-semibold text-red-800">
            falar com chat sobre {country}
          </h1>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
      </div>

      <div className="p-4 border-t border-red-700 flex gap-2">
        <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Digite sua pergunta..."
            className="flex-1 p-2 rounded-lg bg-red-800 border border-red-700 focus:outline-none focus:ring-2 focus:ring-zinc-600"
        />
          <button
            onClick={handleSend}
            className="bg-red-800 hover:bg-red-700 px-4 rounded-lg "
          >
            Perguntar
          </button>
        </div>

      </div>
    </main>
  )
};
