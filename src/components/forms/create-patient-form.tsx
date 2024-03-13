'use client';

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod"

export const formSchema = z.object({
    firstName: z
        .string({
            required_error: "O nome é obrigatório",
            invalid_type_error: "O nome deve ser uma string",
        }),
    lastName: z
        .string({
            required_error: "O sobrenome é obrigatório",
            invalid_type_error: "O sobrenome deve ser uma string",
        }),
    phone: z.string().max(11).refine(validator.isMobilePhone),
    city: z.string(),
    cpf: z.string().refine((cpf: string) => {
        if (typeof cpf !== "string") return false;
        cpf = cpf.replace(/[^\d]+/g, "");
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
        const cpfDigits = cpf.split("").map((el) => +el);
        const rest = (count: number): number => {
            return (((cpfDigits.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10);
        };
        return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
    }, "Digite um cpf válido."),
    gender: z.enum(["masculino", "feminino", "outro"]),
    dateOfBirth: z.string(),
    zipCode: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    neighborhood: z.string(),
    state: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["ROLE_ATENDENTE", "ROLE_ADMINISTRADOR"]),
    status: z.enum(["ATIVO", "INATIVO"]),
    renach: z.string(),
    categoryCNH: z.enum(["A", "B", "C", "D", "E", "ACC"]),
    maritalStatus: z.enum(["SOLTEIRO", "CASADO", "SEPARADO", "DIVORCIADO", "VIUVO"]),
});

type PatientFormValues = z.infer<typeof formSchema>;

export default function CreatePatientForm() {

    const form = useForm<PatientFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            city: "",
            cpf: "",
            gender: "masculino",
            dateOfBirth: "",
            zipCode: "",
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            state: "",
            email: "",
            password: "",
            role: "ROLE_ATENDENTE",
            status: "ATIVO",
            renach: "",
            categoryCNH: "A",
            maritalStatus: "SOLTEIRO",
        },
      });

    const onSubmit = (data: any) => {
        console.log(data);
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="exemplo@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="ml-auto w-full" type="submit">
                        Entrar
                    </Button>
                </form>
            </Form>
        </>
    );
}