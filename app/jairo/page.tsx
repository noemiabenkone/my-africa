"use client"
import { useState } from "react"

export default function jairo() {
      
    const[question, setQuestion] = useState("");
      const[messages, setMessages] = useState<string[]>([]);

      function handleSend() {
        if (!question.trim()) return;

        setMessages((prev) => [...prev, question]);
        setQuestion("");
      }

    return(
        <main className="min-h-screen bg-zinc-900 flex items-center justify-center text-white ">
            <div className=" w-full max-w-sm h-[80vh]  p-6 rounded-lg bg-zinc-950 shadow-md flex flex-col m-6">
                <header className="p-4 border-b border-zinc-800">
                    <h1 className="text-lg font-semibold ">
                      falar com chat
                    </h1>
                </header>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((msg, index) =>(
                        <div key={index} className=" bg-zinc-800 p-2 rounded-lg w-fit">
                            {msg}

                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-zinc-800 flex gap-2">
                    <input value={question} onChange={((e) =>setQuestion(e.target.value))} type="text" placeholder="comente aqui..." className="flex-1 p-2 rounded-lg bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600"/>
                    <button onClick={handleSend} className="bg-zinc-800 hover:bg-zinc-700 px-4 rounded-lg "> enviar</button>
                </div>


            </div>


        </main>
    )
}