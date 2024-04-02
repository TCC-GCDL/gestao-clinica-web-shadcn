import DashboardContent from "@/components/dashboard-content";
import { Heading } from "@/components/ui/heading";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth-options";
import { getData } from "@/lib/get-data";
import { getServerSession } from "next-auth";



export default async function DashboardPage() {  
    
    const session = await getServerSession(authOptions);    

    const data = await getData(session).then((data) => {
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