"use client"

import React from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useSearchParams } from "next/navigation";

export default function page() {
    
    const params = useSearchParams();
	const next = params.get("next") || "";

    const handleLoginWithOAuth = (provider:"github"|"google") => {
        const supabase = supabaseBrowser();
        supabase.auth.signInWithOAuth({
            provider,
            options:{
                redirectTo: location.origin + "/auth/callback?next=" + next,
            }
        })

    }

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="w-96  rounded-md border p-5 space-y-5">

                <div className="flex items-center gap-2">
                    <KeyRound />
                    <h1 className="text-2xl font-bold">Melodot Login</h1>
                </div>
                    <p className="text-sm text-gray-300">Register/Sign-In</p>
            
                <div className="flex flex-col gap">
                    <Button className="w-full flex items-center gap-2" variant="outline" onClick={()=>handleLoginWithOAuth("github")}>
                        <FaGithub/> GitHub
                    </Button>
                    <Button className="w-full flex items-center gap-2" variant="outline" onClick={()=>handleLoginWithOAuth("google")}>
                        <FcGoogle/> Google
                    </Button>
                </div>

            </div>
        </div>
    )
}