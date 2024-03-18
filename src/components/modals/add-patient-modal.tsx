"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useSession } from "next-auth/react";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { ScrollArea } from "../ui/scroll-area";
import { Turma } from "@/constants/data";
import { toast } from "sonner";
import { on } from "events";

interface CellActionProps {
  data: Turma;
}

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  data: Turma;
}

export const formSchema = {

}

export const AddPatientModalModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  data
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const form = useForm();
  const { data: session } = useSession();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getPatients = async () => {
    await fetch('https://gestao-clinica-api-production.up.railway.app/patient', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session?.token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao obter pacientes');
        }
        return response.json();
      })
      .then(data => {
        setPatients(data.content);
        console.log(data.content);



      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };

  useEffect(() => {
    if (session) {
      getPatients();
    }
  }, [session]);

  if (!isMounted) {
    return null;
  }

  const handlePatientChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await fetch(`https://gestao-clinica-api-production.up.railway.app/patient?` + (event.target.value ? `&name=${event.target.value}` : ""), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session?.token

      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('Erro ao obter pacientes');
      }
      return response.json();
    })
      .then(data => {
        setPatients(data.content);
        console.log(data.content);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };

  const addPatient = async (patient: any) => {
    await fetch(`https://gestao-clinica-api-production.up.railway.app/group-medical-care/${data.id}/add-patient/${patient.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session?.token
      },
      body: JSON.stringify(patient)
    }).then(response => {
      if (!response.ok) {
        toast.error(response.json().then(data => data.userMessage), {
          position: 'top-right',
        });        
      } else {
        toast.success('Paciente adicionado com sucesso', {
          position: 'top-right',
        });
        onClose();
      }   
    })
    
  }

  return (
    <Modal
      title="Adicionar paciente"
      description="Deseja adicionar um paciente a essa turma?"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="mb-4">
        <div className="mt-2">
        <Input type="text" placeholder="Digite o nome do paciente"  onChange={handlePatientChange} />
        </div>
      </div>
      <ScrollArea className="h-72 w-full rounded-md border">
        <div className="space-y-2 p-2">
          
          {patients && patients.map((patient: any) => {
            return (
                <div className="flex justify-between" key={patient.id}>
                  <p>{patient.firstName + " " + patient.lastName}</p>
                  <Button variant="outline" onClick={() => addPatient(patient)}>Adicionar</Button>
                </div>      
            )
          })}
        </div>
      </ScrollArea>
    </Modal>
  );
};
