import { getServerSession } from "next-auth"
import BreadCrumb from "@/components/breadcrumb"
import { DataTablePaciente } from "@/components/tables/paciente/data-table"
import { authOptions } from "@/lib/auth-options";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { columns } from "@/components/tables/paciente/columns";
import { Heading } from "@/components/ui/heading";

type paramsProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};


async function getData(page: number, pageLimit: number, name: string | null): Promise<any> {
    const session = await getServerSession(authOptions);

    const response = await fetch(`http://localhost:8081/patient?page=${page - 1}&limit=${pageLimit} ` + (name ? `&name=${name}` : ""), {
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

export default async function PacientesPage({ searchParams }: paramsProps) {
    const page = Number(searchParams.page) || 1;
    const pageLimit = Number(searchParams.limit) || 10;
    const name = Array.isArray(searchParams.search) ? searchParams.search[0] : searchParams.search || null;

    const data = await getData(page, pageLimit, name).then((data) => {
        return data.content;
    });

    const totalUsers = await getData(page, pageLimit, name).then((data) => {
        return data.totalElements;
    })

    const pageCount = Math.ceil(totalUsers / pageLimit);

    return (
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={[{ title: "Pacientes", link: "/dashboard/pacientes" }]} />
            <div className="mb-8">
                <Heading
                    title={`Pacientes (${totalUsers})`}
                    description="Aqui você pode visualizar todos os pacientes cadastrados no sistema."
                />
            </div>
            <DataTablePaciente columns={columns} data={data} searchKey={"firstName"} pageNo={page} totalUsers={totalUsers} pageCount={pageCount} />
        </div>
    )
}