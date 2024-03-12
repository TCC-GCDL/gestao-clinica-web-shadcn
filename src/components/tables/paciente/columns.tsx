"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cel-actions"
import { Paciente } from "@/constants/data"
import { Checkbox } from "@/components/ui/checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Paciente>[] = [
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
    accessorKey: "firstName",
    header: "NOME",
  },
  {
    accessorKey: "lastName",
    header: "SOBRENOME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  // formatar telefone para (99) 99999-9999
  {
    accessorKey: "phone",
    header: "TELEFONE",
    cell: ({ getValue }) => {
      const phone = getValue() as string;
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
  },
  {
    accessorKey: "renach",
    header: "RENACH",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
