import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    engine: "davinci"
  });
  
  const openai = new OpenAIApi(configuration);
  

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

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages
        });

        return new NextResponse(JSON.stringify(response.data.choice[0].messages), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    catch (error) {
        console.log('[CONVERSATION_ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
      }
}
