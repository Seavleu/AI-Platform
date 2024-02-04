import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });
  

export async function POST(req: Request) {
    try {
        // Authentication logic
        const { userId } = auth(); // You need to implement auth() function
        
        // Parse request body
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API KEY is not configured", {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        if (!messages) {
            return new NextResponse("No messages provided", {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

// Creating a chat completion
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": "Hello!"}],
        });

        return new NextResponse(JSON.stringify(response.choices[0].message), {
            status: 200,
        });
    }
    catch (error) {
        console.log('[CONVERSATION_ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
      }
}
