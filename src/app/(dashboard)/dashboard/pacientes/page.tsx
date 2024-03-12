import { getServerSession } from "next-auth"
import BreadCrumb from "@/components/breadcrumb"
import { DataTablePaciente } from "@/components/tables/paciente/data-table"
import { authOptions } from "@/lib/auth-options";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { columns } from "@/components/tables/paciente/columns";
import { Heading } from "@/components/ui/heading";


async function getData(): Promise<any> {
    const session = await getServerSession(authOptions);

    const response = await fetch('http://localhost:8081/patient', {
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

export default async function PacientesPage() {
    const data = await getData().then((data) => {
        return data.content;
    });

    const totalUsers = await getData().then((data) => {
        return data.totalElements;
    })

    return (
        <div className="flex-1 space-y-2  p-4 md:p-8 pt-6">
            <BreadCrumb items={[{ title: "Pacientes", link: "/dashboard/pacientes" }]} />
            <div className="mb-8">
                <Heading
                    title={`Pacientes (${totalUsers})`}
                    description="Aqui você pode visualizar todos os pacientes cadastrados no sistema."
                />
            </div>
            <DataTablePaciente columns={columns} data={data} />
        </div>

    )
}