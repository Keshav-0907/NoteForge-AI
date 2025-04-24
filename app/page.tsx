'use client';
import AuthModal from "@/components/common/AuthModal";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const { session, loading } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const route = useRouter()

  const dispatch = useDispatch()

  const handleNavigate = () => {
    if (session) {
      route.push('/dashboard')
    } else {
      setShowLoginModal(true)
    }
  }


  return (
    <div className="bg-[#121212] h-[91vh] flex items-center justify-center relative">
      <div className="px-4 md:text-sm text-xs w-fit whitespace-nowrap text-center border border-primary/50 py-1 rounded-full shadow-md bg-[#121212] hover:text-primary transition-all duration-300 cursor-pointer absolute top-10 left-1/2 -translate-x-1/2">
        Organize your thoughts effortlessly
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="md:text-5xl text-4xl text-center font-semibold">
          Take Notes. Make Moves.
        </div>

        <div className="max-w-3xl text-center text-xs md:text-sm md:leading-6 text-accent-foreground">
          Capture ideas, jot down thoughts, and organize everything effortlessly in one seamless workspace. Stay focused and in flow, whether you're brainstorming or planning your next big move.        
        </div>
        <div className="flex gap-4 mt-8">
          <Button variant={"outline"} className="cursor-pointer">
            Explore Features
          </Button>

          {
            session ? (
              <Button className="cursor-pointer" onClick={handleNavigate}>
                Go to Dashboard
              </Button>
            ) : (
              <Button className="cursor-pointer" onClick={() => setShowLoginModal(true)}>
                Get Started
              </Button>
            )
          }


        </div>
      </div>

      {
        showLoginModal && (
          <AuthModal setShowLoginModal={setShowLoginModal} />
        )
      }
    </div>
  );
}
