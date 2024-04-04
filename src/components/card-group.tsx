import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Table, TableCaption,TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";

export interface GroupParams {
    group: {
        id: string;
        name: string;
        date: string;
        shift: string;
        doctor: {
            id: string;
            name: string;
        }
        patients: {
            name: string;
            phone: string;
            email: string;
        }[];
        user: {
            id: string;
            name: string;
        };
    }

}

export function CardGroup({group}: GroupParams) {
    function converterData(dataString: string): string {
        const data = new Date(dataString);
        const dia = data.getDate();
        const mes = data.getMonth() + 1; // Mês é baseado em zero
        const ano = data.getFullYear();
    
        // Formatar a data para "dd/MM/yyyy"
        const dataFormatada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`;
    
        return dataFormatada;
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>{group.name}</CardTitle>
                <CardDescription>                    
                    Dia: {converterData(group.date)} <br />
                    Turno: {group.shift} <br />
                    Medico: {group.doctor.name}
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