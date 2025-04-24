"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { supabase } from '@/lib/supabaseClient';


const AuthModal = ({
  setShowLoginModal,
}: {
  setShowLoginModal: (val: boolean) => void;
}) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowLoginModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowLoginModal]);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    return { error };
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div ref={modalRef} className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10"
          onClick={() => setShowLoginModal(false)}
        >
          <X className="h-5 w-5" />
        </Button>

        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">
              {mode === "login" ? "Login" : "Sign Up"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button variant="outline" className="w-full flex items-center gap-2" onClick={signInWithGoogle}>
              <FcGoogle className="h-5 w-5" />
              Continue with Google
            </Button>

            <div className="flex items-center">
              <span className="flex-grow h-px bg-muted-foreground/20" />
              <span className="px-2 text-xs text-muted-foreground uppercase">or</span>
              <span className="flex-grow h-px bg-muted-foreground/20" />
            </div>

            {mode === "signup" && <Input placeholder="Name" />}
            <Input placeholder="Email" />
            <Input placeholder="Password" type="password" />

            <Button className="w-full">
              {mode === "login" ? "Login" : "Sign Up"}
            </Button>

            <Button
              variant="ghost"
              className="text-xs text-muted-foreground hover:underline"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login"
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthModal;