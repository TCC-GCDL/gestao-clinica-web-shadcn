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

export const formSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    phone: z.string().min(8).max(12),    
    email: z.string().email(),
    crm: z.string().min(3),
    specialty: z.string().min(3),
});

type UserFormValues = z.infer<typeof formSchema>;

export default function DoctorForm({ editPage }: { editPage?: any}) {   

    const { data: session } = useSession();
    const router = useRouter();

    console.log(editPage);
    

    const form = useForm<UserFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: editPage ? editPage : {
            firstName: "",
            lastName: "",
            phone: "",            
            email: "",
            crm: "",
            specialty: "",
        },
    });   
    
    



    const onSubmit = async (data: UserFormValues) => {
        const url = editPage ? `https://gestao-clinica-api-production.up.railway.app/doctors/${editPage.id}` : "https://gestao-clinica-api-production.up.railway.app/doctors";

        const method = editPage ? "PUT" : "POST";

        await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session?.token
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if(response.ok){
                const successMessage = editPage ? "Médico atualizado com sucesso" : "Médico cadastrado com sucesso";
                toast.success(successMessage, {
                    position: "top-right",                   
                });

                router.push('/dashboard/medicos');
            } else {
                const data = response.json();
                const userMessage = data.then((data) => data.userMessage)
                toast.error(userMessage, {                    
                    position: "top-right",        
                });
            }

            
        }).catch((error) => {
            console.log(error);
        });

        form.reset();
    }

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
                            name="crm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CRM</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Digite o CRM" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="specialty"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Especialidade</FormLabel>
                                    <FormControl>
                                        <Select                                             
                                            onValueChange={field.onChange}
                                            value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Cardiologia">Cardiologia</SelectItem>
                                                <SelectItem value="Dermatologia">Dermatologia</SelectItem>
                                                <SelectItem value="Ginecologia">Ginecologia</SelectItem>
                                                <SelectItem value="Neurologia">Neurologia</SelectItem>
                                                <SelectItem value="Ortopedia">Ortopedia</SelectItem>
                                                <SelectItem value="Pediatria">Pediatria</SelectItem>
                                                <SelectItem value="Psiquiatria">Psiquiatria</SelectItem>
                                                <SelectItem value="Urologia">Urologia</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>


                    <Button className="ml-auto" type="submit">
                        {editPage ? "Atualizar" : "Cadastrar"}
                    </Button>
                    
                </form>
            </Form>
        </>
    );
}