import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Table, TableCaption,TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";

export interface GroupParams {
    group: {
        name: string;
        hour: string;
        doctor: {
            name: string;
        };
        patients: {
            name: string;
            phone: string;
            email: string;
        }[];
    }

}

export function CardGroup({group}: GroupParams) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{group.name}</CardTitle>
                <CardDescription>                    
                    {/* <p>Horario: {group.hour}
                    <p>Medico: <b>{group.doctor.name}</b></p> */}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>Candidatos presentes na {group.name}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Telefone</TableHead>                            
                            <TableHead>Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    {group.patients.map((patient, index) => (
                        <TableBody key={index}>
                            <TableRow>
                                <TableCell>{patient.name}</TableCell>
                                <TableCell>{patient.phone}</TableCell>
                                <TableCell>{patient.email}</TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>


            </CardContent>

        </Card>
    );
}