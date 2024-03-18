import { CardGroup } from "@/components/card-group";
import { Heading } from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth-options";
import { get } from "http";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";


async function getData(): Promise<any> {
    const session = await getServerSession(authOptions);

    const response = await fetch('http://localhost:8081/group-medical-care', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + session?.token
        }
    })
    
    
    return response.json().then((data) => {
        return data;
    });
    
}




export default async function DashboardPage() {
    
    const turmas = await getData().then((data) => {
        return data.content;
    });

    
    

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
                <div className="grid md:grid-cols-2 gap-4">
                {turmas && turmas.map((turma: any, index: any) => (
                    <CardGroup key={index} group={turma} />
                ))}
                </div>                
            </div>
            </ScrollArea>
        </>
    )
}