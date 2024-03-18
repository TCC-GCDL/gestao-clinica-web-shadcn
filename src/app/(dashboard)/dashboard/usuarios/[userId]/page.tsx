import { getServerSession } from "next-auth";
import BreadCrumb from "@/components/breadcrumb";
import PatientForm from "@/components/forms/patient-form";
import { Heading } from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { authOptions } from "@/lib/auth-options";
import UserForm from "@/components/forms/user-form";

async function getUser(userId: string) {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(`https://gestao-clinica-api-production.up.railway.app/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + session?.token
      }  
    });

    if (!response.ok) {
      throw new Error("Erro ao obter o usuário.");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao obter o usuário:", error);
    return null;
  }
}

export default async function Page({ params }: { params: { userId: string } }) {

  let user;
  if (params.userId && params.userId !== "cadastrar") {
    user = await getUser(params.userId);
  }

  const title = user ? "Edição de Usuários" : "Cadastro de Usuários";
  const description = user ? "Edite os dados do usuário" : "Cadastre um novo usuário"; 
  
  const breadcrumbItems = [
    { title: user ? "Editar" : "Cadastrar", link: `/dashboard/usuarios/${params.userId}` },
  ];  

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={title}
            description={description}
          />
        </div>
        <UserForm editPage={user} />
      </div>
    </ScrollArea>
  );
}