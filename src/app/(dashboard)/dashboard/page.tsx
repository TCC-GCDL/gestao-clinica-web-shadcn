import DashboardContent from "@/components/dashboard-content";
import { Heading } from "@/components/ui/heading";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

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



export default async function DashboardPage() {  
    
    const session = await getServerSession(authOptions);    

    const data = await getGroupToday(session).then((data) => {
        return data;
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
                <DashboardContent  data={data}/>               
            </div>
            </ScrollArea>
        </>
    )
}