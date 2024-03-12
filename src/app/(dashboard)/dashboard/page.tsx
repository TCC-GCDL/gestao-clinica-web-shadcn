'use client';



import ThemeToggle from "@/components/layout/theme-toggle/theme-toggle";
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react";

export default function DashboardPage() {

    const { data: session } = useSession();

    console.log(session);
    
    return (
        <>
            <h1>Dashboard</h1>
            <Button onClick={() => signOut()}>Logout</Button>   
            <ThemeToggle />
        </>
    )
}