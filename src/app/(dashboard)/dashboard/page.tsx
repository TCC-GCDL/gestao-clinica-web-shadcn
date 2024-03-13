'use client';

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardPage() {

    const { data: session } = useSession();

    useEffect(() => {
        if (session?.expires_at) {

            var dateString = session.expires_at;    

            var dateExp = new Date(dateString);
    
            if (Number(dateExp) < Date.now()) {
                signOut();
            }
        }
    }, [session]);

    
    return (
        <>
            <h1>Dashboard</h1>
        </>
    )
}