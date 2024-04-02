"use client";
import { AddPatientModalModal } from "@/components/modals/add-patient-modal";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Turma } from "@/constants/data";
import { ArrowBigDownDash, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
    data: Turma;
}

export const CellActionAddPatient = ({data}: CellActionProps) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const onConfirm = async () => { };

    return (
        <>
            <AddPatientModalModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
                data={data}
            />
            <Button size={"sm"} variant={"secondary"} onClick={() => setOpen(true)}>Adicionar paciente</Button>
        </>
    );
};
