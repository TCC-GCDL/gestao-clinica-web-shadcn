'use client';

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const formSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
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
    gender: z.enum(["MASCULINO", "FEMININO", "OUTRO"]),
    dateOfBirth: z.string(),
    zipCode: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    neighborhood: z.string(),
    state: z.string(),
    status: z.enum(["ATIVO", "INATIVO"]),
    renach: z.string(),
    categoryCNH: z.enum(["A", "B", "C", "D", "E", "ACC"]),
    maritalStatus: z.enum(["SOLTEIRO", "CASADO", "SEPARADO", "DIVORCIADO", "VIUVO"]),
    email: z.string().email(),
    rg: z.string(),
});

type PatientFormValues = z.infer<typeof formSchema>;

export default function CreatePatientForm({ editPage }: { editPage?: any}) {   

    const { data: session } = useSession();
    const router = useRouter();

    console.log(editPage);
    

    const form = useForm<PatientFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: editPage ? editPage : {
            firstName: "",
            lastName: "",
            phone: "",
            city: "",
            cpf: "",
            gender: "MASCULINO",
            dateOfBirth: "",
            zipCode: "",
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            state: "",
            status: "ATIVO",
            renach: "",
            categoryCNH: "A",
            maritalStatus: "SOLTEIRO",
            email: "",
            rg: "",
        },
    });    

    const onSubmit = async (data: PatientFormValues) => {
        await fetch("http://localhost:8081/patient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session?.token
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if(response.ok){
                toast.success("Paciente cadastrado com sucesso", {
                    position: "top-right",                   
                });

                router.push('/dashboard/pacientes');
            } else {
                const data = response.json();
                const userMessage = data.then((data) => data.userMessage)
                toast.error(userMessage, {                    
                    position: "top-right",        
                });
            }

            
        }).catch((error) => {
            console.log(error);
        })



        form.reset();

    }

    const buscarCep = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            form.setValue("neighborhood", data.bairro);
            form.setValue("state", data.uf);
            form.setValue("city", data.localidade);
            form.setValue("street", data.logradouro);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const cep = event.target.value;
        buscarCep(cep);
    };
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sobrenome</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Digite o sobrenome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Telefone</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="Digite o telefone" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CEP</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Digite o CEP" {...field} onBlur={handleCepChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cidade</FormLabel>
                                    <FormControl>
                                        <Input disabled={true} type="text" placeholder="Digite a cidade" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rua</FormLabel>
                                    <FormControl>
                                        <Input disabled={true} type="text" placeholder="Digite a rua" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="neighborhood"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bairro</FormLabel>
                                    <FormControl>
                                        <Input disabled={true} type="text" placeholder="Digite o bairro" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado</FormLabel>
                                    <FormControl>
                                        <Input disabled={true} type="text" placeholder="Digite o estado" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Número</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Digite o número" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="complement"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Complemento</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Digite o complemento" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CPF</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Digite o CPF" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gênero</FormLabel>
                                    <FormControl>
                                        <Select                                            
                                            onValueChange={field.onChange}
                                            value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o gênero" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MASCULINO">Masculino</SelectItem>
                                                <SelectItem value="FEMININO">Feminino</SelectItem>
                                                <SelectItem value="OUTRO">Outro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data de nascimento</FormLabel>
                                    <FormControl>
                                        <Input type="date" placeholder="Digite a data de nascimento" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="renach"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Renach</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Digite o renach" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryCNH"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoria CNH</FormLabel>
                                    <FormControl>
                                        <Select value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione a categoria" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="A">A</SelectItem>
                                                <SelectItem value="B">B</SelectItem>
                                                <SelectItem value="C">C</SelectItem>
                                                <SelectItem value="D">D</SelectItem>
                                                <SelectItem value="E">E</SelectItem>
                                                <SelectItem value="ACC">ACC</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maritalStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado civil</FormLabel>
                                    <FormControl>
                                        <Select value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o estado civil" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="SOLTEIRO">Solteiro</SelectItem>
                                                <SelectItem value="CASADO">Casado</SelectItem>
                                                <SelectItem value="SEPARADO">Separado</SelectItem>
                                                <SelectItem value="DIVORCIADO">Divorciado</SelectItem>
                                                <SelectItem value="VIUVO">Viúvo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Digite o email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rg"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>RG</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Digite o RG" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    <Button className="ml-auto" type="submit">
                        Cadastrar
                    </Button>
                </form>
            </Form>
        </>
    );
}