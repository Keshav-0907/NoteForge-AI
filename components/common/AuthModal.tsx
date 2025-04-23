"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { supabase } from '@/lib/supabaseClient';

const AuthModal = ({ setShowLoginModal }: { setShowLoginModal: (val: boolean) => void }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState<{ email?: string; password?: string; name?: string }>({});
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
      options: { redirectTo: window.location.origin },
    });
    return { error };
  };

  const handleAuth = async () => {
    setErrorMsg({});
    if (!email) setErrorMsg((prev) => ({ ...prev, email: "Email is required." }));
    if (!password) setErrorMsg((prev) => ({ ...prev, password: "Password is required." }));
    if (mode === "signup" && !name) setErrorMsg((prev) => ({ ...prev, name: "Name is required." }));
    if (!email || !password || (mode === "signup" && !name)) return;

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErrorMsg((prev) => ({ ...prev, email: error.message }));
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });
      if (error) setErrorMsg((prev) => ({ ...prev, email: error.message }));
    }
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

            {mode === "signup" && (
              <div className="flex flex-col gap-1">
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                {errorMsg.name && <p className="text-red-500 text-xs">{errorMsg.name}</p>}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {errorMsg.email && <p className="text-red-500 text-xs">{errorMsg.email}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {errorMsg.password && <p className="text-red-500 text-xs">{errorMsg.password}</p>}
            </div>

            <Button className="w-full" onClick={handleAuth}>
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
