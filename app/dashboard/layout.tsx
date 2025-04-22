import Sidebar from "@/components/common/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="flex w-screen h-[91vh]">
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;