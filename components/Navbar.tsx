
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import MobileSidebar from "@/components/MobileSidebar";

const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <Button variant="ghost" size="icon" className="md:hidden">
        <MobileSidebar />
      </Button>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
