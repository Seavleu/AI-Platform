import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Dashboardlayout = ({ 
  children 
}: {
   children: React.ReactNode
}) => {
  return (  
    <div className="h-full relative">
      {/* hidden in mobile device show when reach medui, */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed 
      md:inset-y-0 z-[80] bg-gray-900 ">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        Hello Content 
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Dashboardlayout;