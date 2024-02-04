"use client"

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { ImageIcon, LayoutDashboard, MessageSquare, VideoIcon, Music3, Code, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const montserrat = Montserrat ({
    weight: "600",
    subsets: ["latin"]  
})

// array that store all the routes
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-green-500",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-pink-500",
  },
  {
    label: "Music Generation",
    icon: Music3,
    href: "/music",
    color: "text-cyan-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-gray-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-white-500"
  }
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-3 flex-1">
        {/* Use the Link component from next/link for client-side navigation */}
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            {/* 
              Use the Image component from next/image for optimized image loading.
              Replace the `src` prop with the actual URL or path to your logo image.
            */}
            <Image
              src="/anyai.png"
              alt=""
              width={32} // Provide the width of the image in pixels
              height={32} // Provide the height of the image in pixels
            />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            anyAI
          </h1>
        </Link>
        {/* space evenly */}
        <div className="space-y-1">
          {/* get an individual route link */}
          {routes.map((route) => (
             <Link
             key={route.href} 
             href={route.href}
             className={cn(
               "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
               pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
             )}
           >
              {/* className={cn("text-sm group flex p-3 w-full justify-start 
                font-medium cursor-pointer
                hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                )} */}
              
              <div className="flex item-center flex-1">
                {/* wrap with cn */}
                <route.icon className={cn("h-5 w-9 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
