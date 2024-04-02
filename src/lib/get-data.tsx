export async function getData(session: any): Promise<any> {

    const result = await fetch('https://gestao-clinica-api-production.up.railway.app/group-medical-care', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + session?.token
        }
    })

    if (result.ok) {
        return result.json().then(data => data.content);
    } else {
        throw new Error('Error');
    }
}