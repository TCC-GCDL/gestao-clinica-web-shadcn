import { getServerSession } from "next-auth";
import BreadCrumb from "@/components/breadcrumb";
import PatientForm from "@/components/forms/patient-form";
import { Heading } from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { authOptions } from "@/lib/auth-options";
import DoctorForm from "@/components/forms/doctor-form";

async function getDoctor(medicoId: string) {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(`http://localhost:8081/doctors/${medicoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + session?.token
      }  
    });

    if (!response.ok) {
      throw new Error("Erro ao obter o médico.");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao obter o médico:", error);
    return null;
  }
}

export default async function Page({ params }: { params: { medicoId: string } }) {

  let doctor;
  if (params.medicoId && params.medicoId !== "cadastrar") {
    doctor = await getDoctor(params.medicoId);
  }

  const title = doctor ? "Edição de Usuários" : "Cadastro de Usuários";
  const description = doctor ? "Edite os dados do usuário" : "Cadastre um novo usuário"; 
  
  const breadcrumbItems = [
    { title: doctor ? "Editar" : "Cadastrar", link: `/dashboard/usuarios/${params.medicoId}` },
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
        <DoctorForm editPage={doctor} />
      </div>
    </ScrollArea>
  );
}