"use client";

import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ChatCompletionRequestMessage  from "openai";

// import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
// import { Loader } from "@/components/loader";
// import { UserAvatar } from "@/components/user-avatar";
// import { Empty } from "@/components/ui/empty";
// import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";



const Conversation = () => {
  const router = useRouter();
  const [message, setMessage] = useState<ChatCompletionRequestMessage[]>([]);
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })   
      // Loading state
      const isLoading = form.formState.isSubmitting;

      // 2. Define a submit handler. 
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          // Create the user message object
          const userMessage = {
            role: "user",
            content: values.prompt,
          };
      
          // Update state with the new message
          const newMessages = [...message, userMessage];
      
          // Send the new message to the server
          const response = await axios.post('/api/conversation', { messages: newMessages });
      
          // Update state with the response
          setMessage((current) => [...current, userMessage, response.data]);
      
          // Reset the form after successful submission
          form.reset();
        } catch (error: any) {
          // Handle errors
          if (error?.response?.status === 403) {
            // Handle 403 status
          } else {
            // Handle other errors
          }
        } finally {
          // Refresh the router after submission (optional)
          router.refresh();
        }
      };
      

    return (
        <div>
            <Heading
                title="Conversation"
                description="Our most advanced conversation model."
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"	
            />
            <div className="px-4 lg:px-8">
                <div>
                    {/* Instead of passing all the props -> use ... */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full p-4 px-3 md:px:-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="How to write a good presenation?" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full"
                            disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    Message Content
                </div>
            </div>
        </div>
    );
};

export default Conversation;
