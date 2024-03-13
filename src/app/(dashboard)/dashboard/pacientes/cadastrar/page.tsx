import BreadCrumb from "@/components/breadcrumb";
import CreatePatientForm from "@/components/forms/create-patient-form";
import { Heading } from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
  const breadcrumbItems = [
    { title: "Cadastrar", link: "/dashboard/paciente/cadastrar" },
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Cadastro de Pacientes`}
            description="Aqui você pode cadastrar um novo paciente no sistema."
          />
        </div>
        <CreatePatientForm />
      </div>
    </ScrollArea>
  );
}

