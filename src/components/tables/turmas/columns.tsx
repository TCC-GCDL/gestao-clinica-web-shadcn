"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "../turmas/cel-actions"
import { Turma } from "@/constants/data"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { CellActionAddPatient } from "./add-patient"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Turma>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },  
  {
    accessorKey: "name",
    header: "NOME",
  },
  {
    accessorKey: "add-patient",
    header: () => <div className="text-right">ADICIONAR PACIENTE</div>,
    cell: ({ row }) => <div className="text-right"><CellActionAddPatient data={row.original} /></div>,
    
  },
  {
    id: "actions",
    header: () => <div className="text-right mr-1">AÇÕES</div>,
    cell: ({ row }) => <div  className="text-right mr-1"><CellAction data={row.original} /></div>,
  },
]
