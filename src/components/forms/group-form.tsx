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
    userId: z.string(),
    doctorId: z.string(),
    date: z.string(),
});

type GroupFormValues = z.infer<typeof formSchema>;

export default function GroupForm({ doctors }: { doctors?: any[] }) {   

    const { data: session } = useSession();
    const router = useRouter();


    console.log(doctors);
    
    

    const form = useForm<GroupFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues:  {
            userId: "",
            doctorId: "",
            date: "",
        },
    });

    const onSubmit = async (data: GroupFormValues) => {

        const formattedDate = new Date(data.date).toISOString();
        
        await fetch("https://gestao-clinica-api-production.up.railway.app/group-medical-care", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session?.token
            },
            body: JSON.stringify({
                userId: session?.usuario.id,
                doctorId: data.doctorId,
                date: formattedDate, // Send the formatted date
            })
        }).then((response) => {
            if (response.ok) {
                toast.success("Turma cadastrada com sucesso!");
                router.push("/dashboard/turmas");
            } else {
                toast.error("Erro ao cadastrar a turma.");
            }
        });
    }




    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="md:grid md:grid-cols-3 gap-8">
                    <FormField
                            control={form.control}
                            name="doctorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Médico</FormLabel>
                                    <FormControl>
                                        <Select                                            
                                            onValueChange={field.onChange}
                                            value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o médico" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {doctors && doctors.map((doctor) => {
                                                    return (
                                                        <SelectItem key={doctor.id} value={doctor.id}>
                                                            {doctor.firstName} {doctor.lastName}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            {...field}
                                        />
                                    </FormControl>
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