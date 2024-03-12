import BreadCrumb from "@/components/breadcrumb"

export default function UsuariosPage() {
    return (
        <div>
            <BreadCrumb items={[{ title: "Usuários", link: "/dashboard/usuarios" }]}/>
            <h1>Usuarios</h1>
        </div>
    )
}