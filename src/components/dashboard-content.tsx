'use client';

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { CardGroup } from "./card-group";
import { getData } from "@/app/(dashboard)/dashboard/page";

export default function DashboardContent(props: any) {
    
    const [turmas, setTurmas] = useState(props.data);
    const { data: session } = useSession();
    
    useEffect(() => {
        if (session?.token) {
            getData(session).then((data) => {
                setTurmas(data);
            });
        }
    }, []);  

    return (
        <>
            <div className="grid md:grid-cols-2 gap-4">
                {turmas && turmas.map((turma: any, index: any) => (
                    <CardGroup key={index} group={turma} />
                ))}
            </div>
        </>
    );
}