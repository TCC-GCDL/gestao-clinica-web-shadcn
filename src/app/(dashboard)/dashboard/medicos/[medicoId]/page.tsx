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
    const response = await fetch(`https://gestao-clinica-api-production.up.railway.app/doctors/${medicoId}`, {
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

  const title = doctor ? "Edição de médicos" : "Cadastro de médicos";
  const description = doctor ? "Edite os dados" : "Cadastre um novo médico"; 
  
  const breadcrumbItems = [
    { title: doctor ? "Editar" : "Cadastrar", link: `/dashboard/medicos/${params.medicoId}` },
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