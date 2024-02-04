import { useUser } from "@clerk/nextjs";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

const UserAvatar = () => {
    const { user} = useUser();
    
  return (
   <Avatar className="h-8 w-8">
      <AvatarImage src={user?.profileImageUrl} alt="user's profile" />
      <AvatarFallback>
        {user?.firstName?.toLowerCase()}
        {user?.lastName?.toLowerCase()}
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar