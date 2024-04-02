'use client';

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { CardGroup } from "./card-group";

export default function DashboardContent() {

    const [turmas, setTurmas] = useState<any>([]);
    const { data: session } = useSession();


    async function getData(session: any): Promise<any> {

        await fetch('https://gestao-clinica-api-production.up.railway.app/group-medical-care', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + session?.token
            }
        })
        .then(response => response.json())
        .then(data => {
            setTurmas(data.content);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    useEffect(() => {      
        if (session?.token) {
            getData(session);
        }
    }, [session]);

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