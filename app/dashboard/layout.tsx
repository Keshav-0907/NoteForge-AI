'use client'
import Sidebar from "@/components/common/Sidebar";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!session && !loading) {
      router.push('/')
    }
  }, [session, loading])

  return (
    <div className="flex w-screen h-[91vh]">
      <div className="md:flex hidden">
        <Sidebar />
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;