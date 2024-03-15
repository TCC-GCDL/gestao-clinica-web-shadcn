'use client';

import BreadCrumb from "@/components/breadcrumb";
import { CardGroup } from "@/components/card-group";
import { Heading } from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const data = {
    "name": "Grupo 1",
    "hour": "10:00",
    "doctor": {
        "name": "Dr. Fulano"
    },
    "patients": [
        {
            "name": "Fulano",
            "phone": "777777777777",
            "email": "Vasco"
        },
        {
            "name": "Beltrano",
            "phone": "777777777777",
            "email": "Vasco"
        },
        {
            "name": "Ciclano",
            "phone": "777777777777",
            "email": "Vasco"
        },
        {
            "name": "Fulano",
            "phone": "777777777777",
            "email": "Vasco"
        },
        {
            "name": "Beltrano",
            "phone": "777777777777",
            "email": "Vasco"
        },
        {
            "name": "Ciclano",
            "phone": "777777777777",
            "email": "Vasco"
        },
        {
            "name": "Fulano",
            "phone": "777777777777",
            "email": "Vasco"
        },
        {
            "name": "Beltrano",
            "phone": "777777777777",
            "email": "Vasco"
        },
        {
            "name": "Ciclano",
            "phone": "777777777777",
            "email": "Vasco"
        }
    ]

}

const turmas = [
    data, data, data, data
]

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
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <div className="flex items-start justify-between">
                    <Heading
                        title={`Painel`}
                        description="Bem-vindo ao painel de controle do sistema. Aqui você pode visualizar todas as funcionalidades disponíveis."
                    />
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                {turmas && turmas.map((turma: any, index: any) => (
                    <CardGroup key={index} group={turma} />
                ))}
                </div>                
            </div>
            </ScrollArea>
        </>
    )
}