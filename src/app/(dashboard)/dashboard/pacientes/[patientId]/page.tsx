import { getServerSession } from "next-auth";
import BreadCrumb from "@/components/breadcrumb";
import CreatePatientForm from "@/components/forms/create-patient-form";
import { Heading } from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { authOptions } from "@/lib/auth-options";
import { get } from "http";

async function getPatient(patientId: string) {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(`http://localhost:8081/patient/${patientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + session?.token
      }  
    });

    if (!response.ok) {
      throw new Error("Erro ao obter o paciente.");
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao obter o paciente:", error);
    return null;
  }
}

export default async function Page({ params }: { params: { patientId: string } }) {

  let patient;
  await getPatient(params.patientId).then((data) => patient = data);

  const title = patient ? "Edição de Pacientes" : "Cadastro de Pacientes";
  const description = patient ? "Edite os dados do paciente" : "Cadastre um novo paciente"; 
  
  const breadcrumbItems = [
    { title: patient ? "Editar" : "Cadastrar", link: `/dashboard/paciente/${params.patientId}` },
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
        <CreatePatientForm editPage={patient} />
      </div>
    </ScrollArea>
  );
}