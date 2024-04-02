import DashboardContent from "@/components/dashboard-content";
import { Heading } from "@/components/ui/heading";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";


export default  function DashboardPage() {    
    

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
                <DashboardContent />               
            </div>
            </ScrollArea>
        </>
    )
}