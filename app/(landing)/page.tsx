import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserButton } from "@clerk/nextjs";

const page = () => {
  return (
    <div>
      Landing Page (Unprotected)
      <div className="flex items-center justify-center gap-3 relative mt-7">
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
      </div>
      {/* <UserButton afterSignOutUrl="/" /> */}
      
    </div>
  );
}

export default page
