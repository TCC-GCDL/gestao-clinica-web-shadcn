'use client';

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { CardGroup } from "./card-group";



export async function getGroupToday(session: any): Promise<any> {

    const result = await fetch('https://gestao-clinica-api-production.up.railway.app/group-medical-care/today', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + session?.token
        }
    })

    if (result.ok) {
        return result.json().then(data => data);
    } else {
        throw new Error('Error');
    }
}

export default function DashboardContent(props: any) {
    
    const [turmas, setTurmas] = useState(props.data);
    const { data: session, update } = useSession();
    
    useEffect(() => {
        if (session?.token) {
            getGroupToday(session).then((data) => {
                setTurmas(data);
            });
        }

        update();
    }, []);  

    return (
        <>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Manha
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
                {turmas ? turmas.map((turma: any, index: any) => (
                    turma.shift === "MANHA" ? <CardGroup key={index} group={turma} /> : null
                )) : <p>Não há turmas para hoje.</p>}
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Tarde
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
                {turmas ? turmas.map((turma: any, index: any) => (
                    turma.shift === "TARDE" ? <CardGroup key={index} group={turma} /> : null
                )) : <p>Não há turmas para hoje.</p>}
            </div>
        </>
    );
}