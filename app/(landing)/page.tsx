import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserProfile } from "@clerk/nextjs";

const page = () => {
  return (
    <div>
      Landing Page (Unprotected)
      <div>
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
      </div>
      <div>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div>
      {/* <UserProfile /> */}
    
    </div>
  );
}

export default page
