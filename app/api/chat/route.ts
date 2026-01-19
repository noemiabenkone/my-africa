import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question, country } = await req.json();

    if (!question || !country) {
      return NextResponse.json(
        { error: "Pergunta ou país ausente" },
        { status: 400 }
      );
    }

    const openAIResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `Você é um assistente que responde apenas sobre o país ${country}.`,
            },
            {
              role: "user",
              content: question,
            },
          ],
        }),
      }
    );

    const data = await openAIResponse.json();
    console.log("Resposta da OpenAI:", data);


    const answer =
      data?.choices?.[0]?.message?.content ??
      "Não consegui gerar uma resposta agora.";

    return NextResponse.json({ answer });

  } catch (error) {
    console.error("Erro na API /chat:", error);

    return NextResponse.json(
      { answer: "Erro ao se comunicar com a IA." },
      { status: 500 }
    );
  }
}
