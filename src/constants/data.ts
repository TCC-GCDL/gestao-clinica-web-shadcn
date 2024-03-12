import { NavItem } from "../../types";


export type User = {
  id: number;
  firstName: string;
  sobrenome: string;
  telefone: string;
  cidade: string;
  cpf: string;
  genero: string;
  dataDeNascimento?: string; // Pode ser uma string para a data
  cep: string;
  rua: string;
  numero: number;
  complemento?: string; // Pode ser opcional
  bairro: string;
  estado: string;
  email: string;
  role: string;
};

export type Paciente = {
  id: number;
  firstName: string;
  sobrenome: string;
  telefone: string;
  cidade: string;
  cpf: string;
  genero: string;
  dataDeNascimento?: string; // Pode ser uma string para a data
  cep: string;
  rua: string;
  numero: number;
  complemento?: string; // Pode ser opcional
  bairro: string;
  estado: string;
  email: string;
  role: string;
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Usuários",
    href: "/dashboard/usuarios",
    icon: "user",
    label: "user",
  },
  {
    title: "Pacientes",
    href: "/dashboard/pacientes",
    icon: "employee",
    label: "paciente",
  }
];
