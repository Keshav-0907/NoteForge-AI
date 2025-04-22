import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";

const useAuth = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getSession = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) throw error;
                setSession(data.session);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getSession();
    }, []);

    const logOut = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setSession(null);
            console.log("Logged out successfully");
        }
        catch (err: any) {
            setError(err.message);
        }
    }

    return { session, loading, error, logOut };
};

export default useAuth;
