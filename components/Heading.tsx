
import { cn } from "@/lib/utils";

interface HeadingProps{
    title: string;
    description: string;
    icon: any;
    iconColor?: string;
    bgColor?: string;
}

export const Heading = ({
    description,
    title,
    icon: Icon,
    iconColor,
    bgColor,
}: HeadingProps) => {
    return (
        <>
         <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
            <div className={cn("p-2 w-fit rounded-md", bgColor)}>
                <Icon className= {cn("w-10 h-10", 
                iconColor)}/>
            </div>
            <div>
            <h2 className="text-2xl md:text-4xl font-bold">
                {title}
            </h2>
            <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                {description}
            </p>
        </div>
        </div>
        </>
    )
}