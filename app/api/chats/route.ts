import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
 try{

     const { messages } = await request.json();
     const apiKey = process.env.GEMINI_API_KEY;
     const genAI = new GoogleGenerativeAI(apiKey!);
     const model = genAI.getGenerativeModel({ 
       model: "gemini-2.0-flash" ,
       systemInstruction: "Você é um guia turístico e historiador especialista em países africanos. Responda de forma educativa, respeitosa e entusiasmada sobre a cultura, geografia e história da África."
      });

     const userMessage = messages[messages.length - 1].content;
     const result = await model.generateContent(userMessage);
     const response = await result.response;
     const text = response.text();

     return NextResponse.json({ text });
   }catch (error) {
    console.error(error);
    return NextResponse.json({ text: "Erro ao processar sua solicitação." }, { status: 500 });
}
}