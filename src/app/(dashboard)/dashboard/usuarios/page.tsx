import { getServerSession } from "next-auth"
import BreadCrumb from "@/components/breadcrumb"
import { authOptions } from "@/lib/auth-options";
import { columns } from "@/components/tables/usuario/columns";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableUsuario } from "@/components/tables/usuario/data-table";

type paramsProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
};


async function getData(page: number, pageLimit: number, name: string | null): Promise<any> {
    const session = await getServerSession(authOptions);

    const response = await fetch(`http://localhost:8081/users?page=${page - 1}&limit=${pageLimit} ` + (name ? `&name=${name}` : ""), {
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


export default async function UsuariosPage({ searchParams }: paramsProps) {
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
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={[{ title: "Usuários", link: "/dashboard/usuarios" }]} />
                <div className="flex items-start justify-between">
                    <Heading
                        title={`Usuários (${totalUsers})`}
                        description="Aqui você pode visualizar todos os usuários cadastrados no sistema."
                    />
                </div>
                <Separator />
                <DataTableUsuario columns={columns} data={data} searchKey={"firstName"} pageNo={page} totalUsers={totalUsers} pageCount={pageCount} />
            </div>
        </>
    )
}