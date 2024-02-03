"use client";

import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ChatCompletionRequestMessage from "openai";

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
  const [message, setmessage] = useState<ChatCompletionRequestMessage[]>([]);
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })
    // 2. Define a submit handler.    
      //Loading state
      const isLoading = form.formState.isSubmitting;
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const onSubmit = async (values: z.infer<typeof formSchema>) => {
          try {
            const userMessage: ChatCompletionRequestMessage = {
              role: "user",
              content: values.prompt
            };
            const newMessage = [...message, userMessage];
            const response = await axios.post('/api/conversation', { message: newMessage });
            setMessage([...newMessage, response.data]);
          } catch (error) {
            console.error(error);
            // Handle error here, e.g., display an error message to the user
          } finally {
            router.reload();
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
                        placeholder="How do I calculate the radius of a circle?" 
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